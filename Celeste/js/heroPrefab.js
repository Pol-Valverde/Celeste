class heroPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag='madeline')
    {
        super(_scene,_positionX,_positionY,_spriteTag).setScale(3);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        //_scene.physics.add.existing(this); 
        this.cursores = _scene.input.keyboard.createCursorKeys();

        this.canDash = true;
    }

    preUpdate(time,delta)
    {
        if(!this.dashing)
        {
            if(this.cursores.left.isDown)
            {
                this.body.setVelocityX(-gamePrefs.HERO_SPEED);
                this.setFlipX(true);
                this.anims.play('run',true);
            }else
            if(this.cursores.right.isDown)
            {
                this.body.setVelocityX(gamePrefs.HERO_SPEED);
                this.setFlipX(false);
                this.anims.play('run',true);
            }else
            {
                this.body.setVelocityX(0);
                this.anims.stop().setFrame(0);
            }

            if(!this.body.onFloor())
            {
                if(this.body.velocity.y < 0)
                {
                    this.anims.stop().setFrame(7);
                }
                else
                {
                    this.anims.stop().setFrame(6);
                }
            }
            else
            {
                this.canDash = true;
            }
        }
        else
        {
            //dashAnim???
        }

        super.preUpdate(time, delta);

        console.log(this.canDash);
    }

    JustDashed(_scene)
    {
        this.canDash = false;
        this.dashing = true;
        this.body.allowGravity = false;
        
        this.velY;
        //velocity
        if(this.cursores.up.isDown)
        {
            this.body.setVelocityY(-gamePrefs.HERO_DASH);
            this.velY = -gamePrefs.HERO_DASH;
        }
        else if(this.cursores.down.isDown)
        {
            this.body.setVelocityY(gamePrefs.HERO_DASH);
            this.velY = gamePrefs.HERO_DASH;
        }
        else
        {
            this.body.setVelocityY(0);
        }

        if(this.cursores.right.isDown)
        {
            this.body.setVelocityX(gamePrefs.HERO_DASH);
        }
        else if(this.cursores.left.isDown)
        {
            this.body.setVelocityX(-gamePrefs.HERO_DASH);
        }
        else
        {
            this.body.setVelocityX(0);
        }

        this.partOffset = 10;
        
        //_scene.dashParticles.destroy()
        _scene.dashParticles.createEmitter({
			frame: 'blue',
			x: { min: (this.x - this.partOffset), max: (this.x + this.partOffset) },
			y: { min: (this.y - this.partOffset), max: (this.y + this.partOffset) },
			lifespan: 10000,
			speedX: { min: 25, max: 50 },
			speedY: {min:-10, max:10},
			scale: { start: 0.025, end: 0 },
			quantity: 5.10001,
			blendMode: 'ADD'
		});
        
        this.anims.stop().setFrame(9);
    }

    StopDash(_scene)
    {
        this.canDash = false;
        this.dashing = false;
        this.body.allowGravity = true;

        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
    }

    StopDashParticles(_scene)
    {
        _scene.dashParticles.destroy()
    }
}