class level1 extends Phaser.Scene{
	constructor()
    {
        super({key:'level1'});
    }
	preload()
    {
        this.load.setPath('assets/tilesets/');
        this.load.image('walls','tileset_walls.png');
        this.load.image('moss','tileset_moss.png');
        /*this.load.spritesheet('enemy','enemy-medium.png',
        {frameWidth:32,frameHeight:16});        */

        this.load.setPath('assets/sprites/');
        this.load.image('bg_green','bg_green_tile.png');
        this.load.image('puerta','spr_door_open_0.png');
        this.load.spritesheet('hero','hero.png',
        {frameWidth:32,frameHeight:32});

        this.load.setPath('assets/maps/');
        this.load.tilemapTiledJSON('level1','level1.json');
    }

	create()
    {
    //Pintamos el fondo
    this.bg = this.add.tileSprite(0,0,gamePrefs.LEVEL1_WIDTH,
        gamePrefs.LEVEL1_HEIGHT,'bg_green').setOrigin(0);

    //Pintamos el nivel
    //Cargo el JSON
    this.map = this.add.tilemap('level1');
    //Cargamos los TILESETS
    this.map.addTilesetImage('walls');
    this.map.addTilesetImage('moss');
    //Pintamos las CAPAS/LAYERS
    this.walls = this.map.createLayer('layer_walls','walls');
    this.map.createLayer('layer_moss_top','moss');
    this.map.createLayer('layer_moss_left','moss');
    this.map.createLayer('layer_moss_right','moss');
    this.map.createLayer('layer_moss_bottom','moss');

    //this.map.setCollisionBetween(1,11,true,true,'layer_walls');
    this.map.setCollisionByExclusion(-1,true,true,'layer_walls');


    //Pintamos la puerta
    this.puerta = this.physics.add.sprite(65,268,'puerta');
    this.puerta.body.allowGravity = false;
    this.puerta.body.setImmovable(true);

    //Pintamos al heroe
    //this.hero = this.physics.add.sprite(65,100,'hero');
    this.hero = new heroPrefab(this,65,100);

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
    }


    loadAnimations()
    {
        
        this.anims.create
        ({
            key:'run',
            frames:this.anims.generateFrameNumbers('hero',{start:2,end:5}),
            frameRate:10,
            repeat:-1
        });
        this.anims.create
        ({
            key:'jump',
            frames:this.anims.generateFrameNumbers('hero',{start:2,end:5}),
            frameRate:10,
            repeat:-1
        });
        
    }

	update()
    {
        
        
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
