class menu extends Phaser.Scene{
	
	constructor()
	{
		super({key: "menu"});
		this.font;
	}

	preload()
	{
		this.loadFont('Symtext', 'assets/fonts/Symtext.ttf');
		this.load.setPath('assets/sprites/');
		this.load.image('celeste','Celeste_MainMenu_Image.png');
		this.load.atlas('flares', 'Snow.png', 'flares.json');
		
        //this.load.image('bg1','background_back.png');
        //this.load.image('bg2','background_frontal.png');
        //this.load.spritesheet('nave','naveAnim.png',{frameWidth:16,frameHeight:24});
        //this.load.image('btn_play','btn.png');
    }
	
	create()
	{
		this.particles = this.add.particles('flares').setScale(1);

		this.particles.createEmitter({
			frame: 'blue',
			x: -10,
			y: { min: -1080, max: 1080 },
			lifespan: 20000,
			speedX: { min: 50, max: 500 },
			speedY: {min:-50, max:50},
			scale: { start: 0.025, end: 0.025 },
			quantity: 0.00001,
			blendMode: 'ADD'
		});

		this.particles.createEmitter({
			frame: 'blue',
			x: -10,
			y: { min: -2400, max: 2400 },
			lifespan: 20000,
			speedX: { min: 200, max: 500 },
			speedY: {min:-50, max:50},
			scale: { start: 0.05, end: 0.05 },
			quantity: 0.00001,
			blendMode: 'ADD'
		});

		this.celesteImage = this.add.sprite(config.width/2,200,'celeste').setOrigin(0.5).setScale(4);
		//this.cursores = this.input.keyboard.createCursorKeys();
		this._x = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
		this._c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
		//this.bg1 = this.add.tileSprite(0,0,config.width,config.height,'bg1').setOrigin(0);
		//this.bg2 = this.add.tileSprite(0,0,config.width,config.height,'bg2').setOrigin(0);
		//this.nave = this.physics.add.sprite(config.width/2,config.height/2,'nave').setOrigin(.5).setScale(1);

		/*this.anims.create
        ({
            key:'idle',
            frames:this.anims.generateFrameNumbers('nave',{start:0,end:1}),
            frameRate:10,
            repeat:-1
        });*/
		
        //this.nave.anims.play('idle');

		this.titulo = this.add.text
		(
			config.width/2, 
			config.height/2 +50,
			'X+C',
			{
				fontFamily: 'Symtext',
				fill: '#5f574f',
				fontSize: 24
				
			}
		).setOrigin(.5);

		this.mattThorson = this.add.text
		(
			config.width/2,
			config.height/2 +95,
			'Math Thorson',
			{
				fontFamily: 'Symtext',
				fill: '#5f574f',
				fontSize: 24
			}
		).setOrigin(.5);

		this.noelBerry = this.add.text
		(
			config.width/2,
			config.height/2 +125,
			'Noel Berry',
			{
				fontFamily: 'Symtext',
				fill: '#5f574f',
				fontSize: 24
				
			}
		).setOrigin(.5);
		
		/*
		this.boton = this.add.image
		(config.width/2, 
		config.height/2 +75,
		'btn_play')
		.setScale(.25)
		.setInteractive({useHandCursor:true})
		.on
		(
			'pointerdown',
			this.iniciaJuego,
			this
		);
		*/
	}

	iniciaJuego()
	{
		console.log('LA MAMA')
		this.cambiaEscena();
		console.log('gogogo');
		//this.boton.destroy();

		/*
		this.add.tween
		({
			targets:this.titulo,
			duration:2000,
			alpha:0
		});
		this.add.tween
		({
			targets:this.nave,
			duration:3000,
			y:config.height-20,
			onComplete:this.cambiaEscena,
			onCompleteScope:this
		});
		*/
	}

	cambiaEscena()
	{
		this.scene.start('level1');
	}

	update()
	{
		if(this._x.isDown && this._c.isDown) // JAN: Això s'hauria de canviar per aconseguir especificar-li que els dos botons s'han de prémer en el mateix instant.
		{
			this.iniciaJuego();
		}

		//this.bg1.tilePositionY -=.25;
        //this.bg2.tilePositionY -=1;
	}

	loadFont(name, url)
	{
		var newFont = new FontFace(name, `url(${url})`);
		this.font = name;
		newFont.load().then(function (loaded) {
			document.fonts.add(loaded);
		}).catch(function (error) {
			return error;
		});
	}



}