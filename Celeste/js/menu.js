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
    }
	
	create()
	{
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

		this.celesteImage = this.add.sprite(config.width/2, 132, 'celeste').setOrigin(0.5).setScale(4); // Jan [11/12/2022]: Updated these

		this._x = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
		this._c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

		this.startKeysText = this.add.text
		(
			config.width/2, 
			config.height/2 - 4, // Jan [11/12/2022]: Updated these
			'X+C',
			{
				fontFamily: 'Symtext',
				fill: '#5f574f',
				fontSize: 32 // Jan [11/12/2022]: Updated these
				
			}
		).setOrigin(.5);

		this.polValverde = this.add.text
		(
			config.width/2,
			config.height/2 + 84, // Jan [11/12/2022]: Updated these
			'Pol Valverde',
			{
				fontFamily: 'Symtext',
				fill: '#5f574f',
				fontSize: 32 // Jan [11/12/2022]: Updated these
			}
		).setOrigin(.5);

		this.ericRuiz = this.add.text
		(
			config.width/2,
			config.height/2 + 124, // Jan [11/12/2022]: Updated these
			'Eric Ruiz',
			{
				fontFamily: 'Symtext',
				fill: '#5f574f',
				fontSize: 32 // Jan [11/12/2022]: Updated these
				
			}
		).setOrigin(.5);

		this.janGonzalez = this.add.text
		(
			config.width/2,
			config.height/2 + 164, // Jan [11/12/2022]: Updated these
			'Jan Gonzalez',
			{
				fontFamily: 'Symtext',
				fill: '#5f574f',
				fontSize: 32 // Jan [11/12/2022]: Updated these
				
			}
		).setOrigin(.5);
	}

	iniciaJuego()
	{
		this.cambiaEscena();
	}

	cambiaEscena()
	{
		this.scene.start('100M');
	}

	update()
	{
		if(this._x.isDown && this._c.isDown) // JAN: Això s'hauria de canviar per aconseguir especificar-li que els dos botons s'han de prémer en el mateix instant.
		{
			this.iniciaJuego();
		}
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