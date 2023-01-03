class FourHundredM extends Phaser.Scene
{
	constructor()
    {
        super({key:'400M'});
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

        this.load.spritesheet('madeline','CelesteClassicCharacterSpritesheet.png', {frameWidth: 7, frameHeight: 7});
        this.load.spritesheet('flyingStrawberry','FlyingStrawberrySpritesheet.png', {frameWidth: 20, frameHeight: 9});
        this.load.spritesheet('box','Box.png',{frameWidth: 8, frameHeight: 8});
        this.load.spritesheet('deadAnim','DEAD_CELESTE_Finished.png',{frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('textBackground','textBackground.png', {frameWidth: 32, frameHeight: 8});

        this.load.setPath('assets/maps/');

        // --- Tilemap Json: ---
        this.load.tilemapTiledJSON('400M_Level','400M_Level.json');
        this.load.json('400M_Json','400M_Level.json');

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
        this.dashedParticles = false;

        this.map = this.add.tilemap('400M_Level');

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
        this.map.setCollisionByExclusion(-1, true, true, 'Spikes');
        this.data = this.cache.json.get('400M_Json');
        
        this._x = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this._c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this._s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.hero = new heroPrefab(this, 48, 368);
        
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


        this.loadAnimations();
        this.loadObjects();

        this.loadSounds();

        this.cameras.main.setBounds(0,0,gamePrefs.GAME_WIDTH,gamePrefs.GAME_HEIGHT);
        this.dashParticles = this.add.particles('flares').setScale(1);
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
        
        this.gameTimer = new inGametimer(this, 80, 30, 'textBackground');
        this.animDead = new AnimDeadMadeline(this,0,0, 'deadAnim');
    }

    hit()
    {
        this.die.play();
        this.cameras.main.shake(100,0.05);
        //this.cameras.main.flash(200,0,0,0);
        this.dashParticles.destroy()
        this.animDead.body.reset(this.hero.x,this.hero.y);
        this.animDead.show();
        this.hero.visible = false;
        this.hero.body.reset(48, 380);
        this.physics.world.disable(this.hero);
        this.time.delayedCall(200,this.recoverPlayer,[],this);
        
    }
    recoverPlayer()
    {
        this.gameTimer.show();
        this.hero.anims.play('run',true);
        this.hero.visible = true;
        this.physics.world.enable(this.hero);
        this.hero.body.allowGravity = true;
    }
    loadObjects()
    {
        var layer = 3;

        for(var i = 0; i < this.data.layers[layer].objects.length; i++)
        {
            var _posX = this.data.layers[layer].objects[i].x;
            var _posY = this.data.layers[layer].objects[i].y;

            switch(this.data.layers[layer].objects[i].class)
            {
                case "BreakableWall":
                    var _newBreakableWall = new breakeableWallPrefab(this, _posX, _posY, 'breakeableWall');
                    break;
                case "Strawberry":
                    var _newStrawberry = new strawberryPrefab(this, _posX, _posY, 'strawberry');
                    break;
                case "Spring":
                    var _newSpring = new springPrefab(this, _posX, _posY, 'spring');
                    break;
                case "BreakingBlock":
                    var _newBreakingGround = new breakingGroundPrefab(this, _posX, _posY, 'box');
                    break;
                case "FlyingStrawberry":
                    this.flyingStrawberry = new flyingStrawberryPrefab(this, _posX, _posY, 'flyingStrawberry');
                    break;
                case "Key":
                    var _newKey = new keyPrefab(this, _posX, _posY, 'keySprite');
                    break;
                case "Chest":
                    //var _newChest
                    var _newChest = new chestPrefab(this, _posX, _posY, 'chest');
                    break;
                case "Balloon":
                    var _newBaloon = new baloonPrefab(this, _posX, _posY, 'baloon');
                    break;
                case "LeftCloud":
                    this.newCloud = new cloudPlaformPrefab(this, _posX, _posY, 'cloudPlatform', -1);
                    break;
                case "RightCloud":
                    this.newCloud = new cloudPlaformPrefab(this, _posX, _posY, 'cloudPlatform', 1);
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
        this.anims.create
        ({
            key:'boxDestroy',
            frames:this.anims.generateFrameNumbers('box',{start:0,end:3}),
            frameRate:2,
            repeat:0
        })
        this.anims.create
        ({
            key:'flyStrawberry',
            frames:this.anims.generateFrameNumbers('flyingStrawberry',{start:0,end:2}),
            frameRate:5,
            repeat:-1
        })
        this.anims.create({
            key:'deadAnimK',
            frames:this.anims.generateFrameNumbers('deadAnim',{start:0,end:10}),
            frameRate:24,
            repeat:0

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

	update(time, delta)
    {
        totalTime += delta;
        if(this._s.isDown)
        {
                gamePrefs.MUTE = !gamePrefs.MUTE;
                this.game.sound.mute = !gamePrefs.MUTE;

        }
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
            this.flyingStrawberry.flyAway()

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
        if (this.hero.y < 15)
        this.scene.start('500M');

        // --- VOID DEATH: ---
        if((this.hero.y > gamePrefs.GAME_HEIGHT - 15) )
        {
            this.hit();
        }

        this.hero.postUpdate();
    }
}
