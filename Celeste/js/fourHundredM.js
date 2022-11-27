class FourHundredM extends Phaser.Scene
{
	constructor()
    {
        super({key:'400M'});
    }

	preload()
    {
        this.load.setPath('assets/tilesets/');
        //this.load.image('walls','tileset_walls.png');
        //this.load.image('moss','tileset_moss.png');

        // --- 100M Level: ---
        this.load.image('CelesteClassic_Walls',                 'CelesteClassic_Walls.png'); // JAN: carreguem tot el tileset que farem servir
        //this.load.image('CelesteClassic_Breakable_Walls',     'CelesteClassic_Walls.png');
        this.load.image('CelesteClassic_Background',            'CelesteClassic_Background.png');
        this.load.image('CelesteClassic_SoftDecorations',       'CelesteClassic_SoftDecorations.png');
        this.load.image('CelesteClassic_Spikes',                'CelesteClassic_Spikes.png');
        this.load.image('CelesteClassic_Everything',            'CelesteClassic_Everything.png'); // <--- NEW LAYER ADDED (EVERYTHING)

        /*
        this.load.spritesheet('enemy','enemy-medium.png',
        {frameWidth:32,frameHeight:16});
        */

        this.load.setPath('assets/sprites/');
        //this.load.image('bg_green','bg_green_tile.png');
        //this.load.image('puerta','spr_door_open_0.png');
        //this.load.spritesheet('hero','hero.png', {frameWidth:32,frameHeight:32});
        this.load.spritesheet('madeline','CelesteClassicCharacterSpritesheet.png', {frameWidth: 7, frameHeight: 7});

        this.load.setPath('assets/maps/');
        //this.load.tilemapTiledJSON('level1','level1.json');

        // --- 100M Level: ---
        this.load.tilemapTiledJSON('400M_Level','400M_Level.json'); // HERE!!!!!
        this.load.json('jsonlvl1','400M_Level.json');
    }

	create()
    {
        //Pintamos el fondo // JAN: ara mateix el deixem negre
        //this.bg = this.add.tileSprite(0, 0, gamePrefs.LEVEL1_WIDTH, gamePrefs.LEVEL1_HEIGHT, 'bg_green').setOrigin(0);

        //Pintamos el nivel
        //Cargo el JSON
        //this.map = this.add.tilemap('level1');
        this.map = this.add.tilemap('400M_Level'); // HERE!!!!!
        //Cargamos los TILESETS
        //this.map.addTilesetImage('walls');
        //this.map.addTilesetImage('moss');

        // --- 100M Level: ---
        this.map.addTilesetImage('CelesteClassic_Walls');  // HERE!!!!!
        // this.map.addTilesetImage('CelesteClassic_Breakable_Walls');
        this.map.addTilesetImage('CelesteClassic_Background');
        this.map.addTilesetImage('CelesteClassic_SoftDecorations');
        this.map.addTilesetImage('CelesteClassic_Spikes');
        this.map.addTilesetImage('CelesteClassic_Everything'); // <--- NEW LAYER ADDED (EVERYTHING)

        //Pintamos las CAPAS/LAYERS
        //this.walls = this.map.createLayer('layer_walls','walls');
        //this.map.createLayer('layer_moss_top','moss');
        //this.map.createLayer('layer_moss_left','moss');
        //this.map.createLayer('layer_moss_right','moss');
        //this.map.createLayer('layer_moss_bottom','moss');

        // --- 100M Level: ---
        this.map.createLayer('Background',  'CelesteClassic_Background');
        this.map.createLayer('Decorations', 'CelesteClassic_SoftDecorations');
        this.walls =            this.map.createLayer('Walls_Ground_&_Ceiling',  'CelesteClassic_Walls');
        this.breakable_walls =  this.map.createLayer('Breakable_Walls',         'CelesteClassic_Walls');
        this.spikes =           this.map.createLayer('Spikes',                  'CelesteClassic_Spikes');
        this.everything =       this.map.createLayer('Everything',              'CelesteClassic_Everything'); // <--- NEW LAYER ADDED (EVERYTHING)

        //this.map.setCollisionBetween(1,11,true,true,'layer_walls');
        //this.map.setCollisionByExclusion(-1,true,true,'layer_walls');

        // --- 100M Level: ---
        this.map.setCollisionByExclusion(-1, true, true, 'Walls_Ground_&_Ceiling');
        this.map.setCollisionByExclusion(-1, true, true, 'Spikes');
        this.map.setCollisionByExclusion(-1, true, true, 'Everything');
        this.data = this.cache.json.get('jsonlvl1');
        //Pintamos la puerta
        //this.puerta = this.physics.add.sprite(65,268,'puerta');
        //this.puerta.body.allowGravity = false;
        //this.puerta.body.setImmovable(true);

        //Pintamos al heroe
        //this.hero = this.physics.add.sprite(65,100,'hero');
        
        this._x = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this._c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        this.hero = new heroPrefab(this, 11, 92);

        /*
        this.physics.add.collider
        (
            this.puerta,
            this.hero
        );
        */
        
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
        
        
        
        //this.cursores = this.input.keyboard.createCursorKeys();
        /* 
        this.cursores.space.on
        (
            'up',
            function()
            {
                this.createBullet();            
            },
            this
        );
        */
        
        /*
        this.physics.add.overlap
        (
            this.bulletPool,
            this.enemyPool,
            this.killEnemy,
            null,
            this
        );
        */
        
        //this.cameras.main.startFollow(this.hero);
        this.cameras.main.setBounds(0,0,gamePrefs.GAME_WIDTH,gamePrefs.GAME_HEIGHT);
        this.dashParticles = this.add.particles('flares').setScale(1);
        this.particles = this.add.particles('flares').setScale(1);

        this.particles.createEmitter({
			frame: 'blue',
			x: -10,
			y: { min: -2548 / 4, max: 2548 / 4 },
			lifespan: 20000,
			speedX: { min: 50 / 4, max: 500 / 4 },
			speedY: { min:-50 / 4, max:50 / 4 },
			scale: { start: 0.025 / 4, end: 0.025 / 4 },
			quantity: 0.00001,
			blendMode: 'ADD'
		});

		this.particles.createEmitter({
			frame: 'blue',
			x: -10,
			y: { min: -4096 / 4, max: 4096 / 4 },
			lifespan: 20000,
			speedX: { min: 200 / 4, max: 500 / 4 },
			speedY: { min:-50 / 4, max:50 / 4 },
			scale: { start: 0.05 / 4, end: 0.05 / 4 },
			quantity: 0.00001,
			blendMode: 'ADD'
		});
    }

    
    hit()
    {
        this.hero.body.reset(11, 92);
        this.cameras.main.shake(100,0.05);
        this.cameras.main.flash(200,0,0,0);
    }




    loadAnimations()
    {
        //this.anims.create
        //({
        //    key:'run',
        //    frames:this.anims.generateFrameNumbers('hero',{start:2,end:5}),
        //    frameRate:10,
        //    repeat:-1
        //});
        //this.anims.create
        //({
        //    key:'jump',
        //    frames:this.anims.generateFrameNumbers('hero',{start:2,end:5}),
        //    frameRate:10,
        //    repeat:-1
        //});
        
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
            this.dashParticles = this.add.particles('flares').setScale(1);
            this.timedEvent = this.time.delayedCall(500, this.hero.StopDashParticles, [this], this.hero);
            this.hero.JustDashed(this);
            this.timedEvent = this.time.delayedCall(150, this.hero.StopDash, [this], this.hero);
        }

        // --- CHANGE LEVEL: ---
        if (this.hero.y < 0)
            this.scene.start('500M');

        // --- VOID DEATH: ---
        if((this.hero.y > gamePrefs.GAME_HEIGHT) || (this.hero.x < -3))
        {
            this.hit();
        }
        /*
        this.bg1.tilePositionY -=.25;
        this.bg2.tilePositionY -=1;

        if(this.cursores.left.isDown){            			
            this.nave.anims.play('left',true);
            //this.nave.x -=gamePrefs.SPEED_NAVE;
			this.nave.body.velocity.x -=gamePrefs.SPEED_NAVE;
		} else if(this.cursores.right.isDown){            
			this.nave.anims.play('right',true);           
            //this.nave.x +=gamePrefs.SPEED_NAVE;
            this.nave.body.velocity.x += gamePrefs.SPEED_NAVE;        
		} else{
			this.nave.anims.play('idle',true);
			//this.nave.body.velocity.x=0;
		}
        */
    }
}
