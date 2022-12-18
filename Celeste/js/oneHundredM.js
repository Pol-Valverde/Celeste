class OneHundredM extends Phaser.Scene
{
	constructor()
    {
        super({key:'100M'});
    }

	preload()
    {   
        this.load.setPath('assets/tilesets/');

        // --- Tilemap Images: ---
        this.load.image('CelesteClassic_Walls',                 'CelesteClassic_Walls.png'); // JAN: carreguem tot el tileset que farem servir
        this.load.image('CelesteClassic_Background',            'CelesteClassic_Background.png');
        this.load.image('CelesteClassic_SoftDecorations',       'CelesteClassic_SoftDecorations.png');
        this.load.image('CelesteClassic_Spikes',                'CelesteClassic_Spikes.png');

        this.load.setPath('assets/sprites/');
        this.load.image('strawberry', 'StrawberrySpritesheet.png');
        this.load.image('breakeableWall', 'BreakableWallSpritesheet.png');
        this.load.spritesheet('madeline','CelesteClassicCharacterSpritesheet.png', {frameWidth: 7, frameHeight: 7});

        this.load.setPath('assets/maps/');

        // --- Tilemap Json: ---
        this.load.tilemapTiledJSON('100M_Level','100M_Level.json');
        this.load.json('100M_Json','100M_Level.json');

        // --- Audio: ---
        this.load.setPath('assets/sounds/');
        this.load.audio('dash','dash.wav');
        this.load.audio('die','die.wav');
        this.load.audio('jump','jump.wav');
        this.load.audio('menuStart','menuStart.wav');
        this.load.audio('strawBerry','strawBerry.wav');
    }

	create()
    {
        this.map = this.add.tilemap('100M_Level');

        // --- Tilemap Tileset Images: ---
        this.map.addTilesetImage('CelesteClassic_Walls');
        this.map.addTilesetImage('CelesteClassic_Background');
        this.map.addTilesetImage('CelesteClassic_SoftDecorations');
        this.map.addTilesetImage('CelesteClassic_Spikes');
        
        //background Particles
        this.cloudParticles = this.add.particles('backgroundClouds').setScale(1);

        this.cloudParticles.createEmitter({
			frame: 'green',
			x: -10,
			y: { min: -2548, max: 2548 },
			lifespan: 20000,
			speedX: { min: 200, max: 500 },
			scale: 0.25,
			quantity: 0.00001,
			blendMode: 'ADD'
		});

        // --- Tilemap Layers: ---
        this.map.createLayer('Background',  'CelesteClassic_Background');
        this.map.createLayer('Decorations', 'CelesteClassic_SoftDecorations');
        this.walls =            this.map.createLayer('Walls_Ground_&_Ceiling',  'CelesteClassic_Walls');
        this.spikes =           this.map.createLayer('Spikes',                  'CelesteClassic_Spikes');

        // --- Tilemap Collisions: ---
        this.map.setCollisionByExclusion(-1, true, true, 'Walls_Ground_&_Ceiling');
        this.map.setCollisionByExclusion(-1,true, true, 'Spikes')
        this.data = this.cache.json.get('100M_Json');
        
        this._x = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this._c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        this.hero = new heroPrefab(this, 48, 368);
        
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
            this.walls,
            this.hero
        );

        this.loadAnimations();
        this.loadObjects();
        this.loadSounds();
  
        this.cameras.main.setBounds(0,0,gamePrefs.GAME_WIDTH,gamePrefs.GAME_HEIGHT);
        
        this.dashParticles = this.add.particles('celesteFlares').setScale(1);
        
        this.particles = this.add.particles('flares').setScale(1);

        this.particles.createEmitter({
			frame: 'blue',
			x: -10,
			y: { min: -2548, max: 2548 },
			lifespan: 20000,
			speedX: { min: 50, max: 500 },
			speedY: { min:-50, max: 50 },
			scale: { start: 0.025, end: 0.025 },
			quantity: 0.00001,
			blendMode: 'ADD'
		});

		this.particles.createEmitter({
			frame: 'blue',
			x: -10,
			y: { min: -4096, max: 4096 },
			lifespan: 20000,
			speedX: { min: 200, max: 500 },
			speedY: { min:-50, max: 50 },
			scale: { start: 0.05, end: 0.05 },
			quantity: 0.00001,
			blendMode: 'ADD'
		});
        this.dashedParticles = false
    }

    hit()
    {
        this.die.play();

        this.hero.body.reset(48, 368);
        this.cameras.main.shake(100,0.05);
        this.cameras.main.flash(200,0,0,0);
        this.dashParticles.destroy()
    }

    loadObjects()
    {
        var layer = 2;
        for(var i = 0; i < this.data.layers[layer].objects.length; i++)
        {
            var _posX = this.data.layers[layer].objects[i].x;
            var _posY = this.data.layers[layer].objects[i].y;

            switch(this.data.layers[layer].objects[i].class)
            {
                case "Strawberry":
                    var _newStrawberry = new strawberryPrefab(this, _posX, _posY, 'strawberry');
                    break;
                case "BreakableWall":
                    //var _newBreakableWall = new breakea(this, _posX, _posY, 'keySprite');
                    break;
            }
        }
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
        this.anims.create({
            key:'float',
            frames:this.anims.generateFrameNumbers('strawberry',{start:0,end:0}),
            frameRate:2,
            repeat:-1

        });
    }

    loadSounds()
    {
        this.dash = this.sound.add('dash');
		this.die = this.sound.add('die');
		this.jump = this.sound.add('jump');
		this.menuStart = this.sound.add('menuStart');
		this.strawBerry = this.sound.add('strawBerry');
    }

	update()
    {
        // --- JUMP: ---
        if (this._c.isDown && this.hero.isCUp)
        {
            this.hero.isCUp = false;
            if(this.hero.body.blocked.down)
            {
                this.jump.play();

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
            this.dash.play();

            this.cameras.main.shake(50,0.05);
            if(this.dashedParticles == false)
            {
                this.dashedParticles = true;
                this.hero.dashedAnim = true;
                this.dashParticles = this.add.particles('celesteFlares').setScale(1);
            }
            this.hero.JustDashed(this);
            this.timedEvent = this.time.delayedCall(gamePrefs.HERO_DASHTIME, this.hero.StopDash, [this], this.hero);
            this.time.delayedCall(500,this.hero.StopDashParticles,[this],this);
            
        }

        // --- CHANGE LEVEL: ---
        if (this.hero.y < 0)
            this.scene.start('200M');

        // --- VOID DEATH: ---
        if((this.hero.y > gamePrefs.GAME_HEIGHT) || (this.hero.x < -3))
        {
            this.hit();
        }

        this.hero.postUpdate();
    }
}
