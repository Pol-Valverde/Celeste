class ThreeHundredM extends Phaser.Scene
{
	constructor()
    {
        super({key:'300M'});
    }

	preload()
    {
        this.load.setPath('assets/tilesets/');

        // --- Tilemap Images: ---
        this.load.image('CelesteClassic_Walls',                 'CelesteClassic_Walls.png'); // JAN: carreguem tot el tileset que farem servir
        //this.load.image('CelesteClassic_Breakable_Walls',     'CelesteClassic_Walls.png');
        this.load.image('CelesteClassic_Background',            'CelesteClassic_Background.png');
        this.load.image('CelesteClassic_SoftDecorations',       'CelesteClassic_SoftDecorations.png');
        this.load.image('CelesteClassic_Spikes',                'CelesteClassic_Spikes.png');
        this.load.image('CelesteClassic_Everything',            'CelesteClassic_Everything.png');

        this.load.setPath('assets/sprites/');
        this.load.spritesheet('madeline','CelesteClassicCharacterSpritesheet.png', {frameWidth: 7, frameHeight: 7});

        this.load.setPath('assets/maps/');

        // --- Tilemap Json: ---
        this.load.tilemapTiledJSON('300M_Level','300M_Level.json');
        this.load.json('jsonlvl1','300M_Level.json');
    }

	create()
    {
        this.dashedParticles = false;
        
        this.map = this.add.tilemap('300M_Level');

        // --- Tilemap Tileset Images: ---
        this.map.addTilesetImage('CelesteClassic_Walls');
        // this.map.addTilesetImage('CelesteClassic_Breakable_Walls');
        this.map.addTilesetImage('CelesteClassic_Background');
        this.map.addTilesetImage('CelesteClassic_SoftDecorations');
        this.map.addTilesetImage('CelesteClassic_Spikes');
        this.map.addTilesetImage('CelesteClassic_Everything');

        // --- Tilemap Layers: ---
        this.map.createLayer('Background',  'CelesteClassic_Background');
        this.map.createLayer('Decorations', 'CelesteClassic_SoftDecorations');
        this.walls =            this.map.createLayer('Walls_Ground_&_Ceiling',  'CelesteClassic_Walls');
        this.breakable_walls =  this.map.createLayer('Breakable_Walls',         'CelesteClassic_Walls');
        this.spikes =           this.map.createLayer('Spikes',                  'CelesteClassic_Spikes');
        this.everything =       this.map.createLayer('Everything',              'CelesteClassic_Everything');

        // --- Tilemap Collisions: ---
        this.map.setCollisionByExclusion(-1, true, true, 'Walls_Ground_&_Ceiling');
        this.map.setCollisionByExclusion(-1, true, true, 'Spikes');
        this.map.setCollisionByExclusion(-1, true, true, 'Everything');
        this.data = this.cache.json.get('jsonlvl1');
        
        this._x = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this._c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        this.hero = new heroPrefab(this, 44, 400); // Jan [11/12/2022]: Updated these
        
        this.physics.add.collider
        (
            this.walls,
            this.hero
        );

        this.physics.add.collider
        (
            this.hero,
            this.spikes,
            this.hit,
            null,
            this
        );

        this.physics.add.collider
        (
            this.everything,
            this.hero
        );

        this.loadAnimations();

        this.cameras.main.setBounds(0,0,gamePrefs.GAME_WIDTH,gamePrefs.GAME_HEIGHT);
        this.dashParticles = this.add.particles('flares').setScale(1);
        this.particles = this.add.particles('flares').setScale(1);

        this.particles.createEmitter({
			frame: 'blue',
			x: -10,
			y: { min: -2548, max: 2548 }, // Jan [11/12/2022]: Updated these
			lifespan: 20000,
			speedX: { min: 50, max: 500 }, // Jan [11/12/2022]: Updated these
			speedY: { min:-50, max: 50 }, // Jan [11/12/2022]: Updated these
			scale: { start: 0.025, end: 0.025 }, // Jan [11/12/2022]: Updated these
			quantity: 0.00001,
			blendMode: 'ADD'
		});

		this.particles.createEmitter({
			frame: 'blue',
			x: -10,
			y: { min: -4096, max: 4096 }, // Jan [11/12/2022]: Updated these
			lifespan: 20000,
			speedX: { min: 200, max: 500 }, // Jan [11/12/2022]: Updated these
			speedY: { min:-50, max: 50 }, // Jan [11/12/2022]: Updated these
			scale: { start: 0.05, end: 0.05 }, // Jan [11/12/2022]: Updated these
			quantity: 0.00001,
			blendMode: 'ADD'
		});
    }

    hit()
    {
        this.hero.body.reset(48, 368); // Jan [11/12/2022]: Updated these
        this.cameras.main.shake(100,0.05);
        this.cameras.main.flash(200,0,0,0);
        this.dashParticles.destroy()
    }

    loadAnimations()
    {
        this.anims.create
        ({
            key:'run',
            frames:this.anims.generateFrameNumbers('madeline',{start:0,end:3}),
            frameRate:10,
            repeat:-1
        });
        this.anims.create
        ({
            key:'jump',
            frames:this.anims.generateFrameNumbers('madeline',{start:5,end:8}),
            frameRate:10,
            repeat:-1
        });
    }

	update()
    {
        // --- JUMP: ---
        if (this._c.isDown && this.hero.isCUp)
        {
            this.hero.isCUp = false;
            if(this.hero.body.blocked.down)
            {
                this.hero.body.setVelocityY(-gamePrefs.HERO_JUMP);
            }
            else if((this.hero.wallSliding || this.hero.canWallJump) && !this.hero.wallJumping)
            {
                this.hero.WallJump()
                this.timedEvent = this.time.delayedCall(gamePrefs.HERO_WALLJUMP_TIME, this.hero.StopWallJump, [this], this.hero);
            }
        }
        else if(this._c.isUp)
        {
            this.hero.isCUp = true;
        }

        // --- DASH: ---
        if (this._x.isDown && this.hero.canDash && !this.hero.dashing )
        {
            this.cameras.main.shake(50,0.05);
            if(this.dashedParticles == false)
            {
                this.dashedParticles = true;
                this.hero.dashedAnim = true;
                this.dashParticles = this.add.particles('celesteFlares').setScale(1);
            }
            this.hero.JustDashed(this);
            this.timedEvent = this.time.delayedCall(150, this.hero.StopDash, [this], this.hero);
            this.time.delayedCall(500,this.hero.StopDashParticles,[this],this);
        }

        // --- CHANGE LEVEL: ---
        if (this.hero.y < 0)
            this.scene.start('400M');
            
        // --- VOID DEATH: ---
        if((this.hero.y > gamePrefs.GAME_HEIGHT) || (this.hero.x < -3))
        {
            this.hit();
        }
    }
}
