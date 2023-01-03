class heroPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'madeline')
    {
        super(_scene, _positionX, _positionY, _spriteTag).setScale(4);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.cursores = _scene.input.keyboard.createCursorKeys();

        this.canDash = true;
        this.body.collideWorldBounds = true;
        this.wallSliding = false;
        this.wallJumping = false;
        this.lastXDir = 0;
        this.canWallJump = false;
        this.dashedAnim = false;
        this.isCUp = true;
        this.speedXParticles = 0.0;
        this.speedYParticles = 0.0;
    }

    preUpdate(time, delta)
    {
        if(this.wallJumping && this.body.velocity.x == 0)
        {
            this.wallJumping = false;
            this.body.allowGravity = true;

            this.body.setVelocityY(-20);
        }

        if (!this.dashing && !this.wallJumping)
        {
            if (this.cursores.left.isDown)
            {
                this.body.setVelocityX(-gamePrefs.HERO_SPEED);
                this.setFlipX(true);
                this.anims.play('run',true);
            }
            else if (this.cursores.right.isDown)
            {
                this.body.setVelocityX(gamePrefs.HERO_SPEED);
                this.setFlipX(false);
                this.anims.play('run',true);
            }
            else
            {
                this.body.setVelocityX(0);
                this.anims.stop().setFrame(0);
            }

            if (!this.body.onFloor())
            {
                if(this.dashedAnim)
                {
                    if(this.body.velocity.y < 0)
                    {
                        this.anims.stop().setFrame(10);
                    }
                    else
                    {
                        this.anims.stop().setFrame(8);
                    }
                }
                else
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
            }
            else
            {
                this.canDash = true;
                this.dashedAnim = false;
            }
        }

        if(this.body.velocity.y > 0 && this.body.onWall() && !this.wallJumping)
        {
            this.body.velocity.y = 100;

            this.wallSliding = true;
        }
        else{
            this.wallSliding = false;
        }

        if(this.body.onWall())
        {
            this.canWallJump = true;
        }

        super.preUpdate(time, delta);
    }

    postUpdate()
    {
        if(this.body.velocity.x > 10 || this.body.velocity.x < -10)
        {
            this.lastXDir = this.body.velocity.x;

            if(!this.body.onWall())
            {
                this.canWallJump = false;
            }
        }
    }

    WallJump(_scene)
    {
        this.scene.jump.play();

        this.wallJumping = true;
        this.body.allowGravity = false;
        this.body.setVelocityY(-gamePrefs.HERO_WALLJUMP_Y);
        if(this.lastXDir > 0)
        {
            this.body.setVelocityX(-gamePrefs.HERO_WALLJUMP_X);
        }
        else{
            this.body.setVelocityX(gamePrefs.HERO_WALLJUMP_X);
        }
    }

    StopWallJump(_scene)
    {
        if(this.wallJumping)
        {
            this.wallJumping = false;
            this.body.allowGravity = true;
        }
    }

    JustDashed(_scene)
    {
        this.canDash = false;
        this.dashing = true;
        this.body.allowGravity = false;
        this.dashedAnim = true;
        this.velY;

        if(this.cursores.up.isDown)
        {
            this.body.setVelocityY(-gamePrefs.HERO_DASH);
            this.velY = -gamePrefs.HERO_DASH;
            this.speedYParticles = -1.0;


        }
        else if(this.cursores.down.isDown)
        {
            this.body.setVelocityY(gamePrefs.HERO_DASH);
            this.velY = gamePrefs.HERO_DASH;
            this.speedYParticles = 1.0;
        }
        else
        {
            this.body.setVelocityY(0);
            this.speedYParticles = 0.0;
        }

        if(this.cursores.right.isDown)
        {
            this.body.setVelocityX(gamePrefs.HERO_DASH);
            this.speedXParticles = 1.0;
        }
        else if(this.cursores.left.isDown)
        {
            this.body.setVelocityX(-gamePrefs.HERO_DASH);
            this.speedXParticles = -1.0;
        }
        else
        {
            this.body.setVelocityX(0);
            this.speedXParticles = 0.0;
        }
        
        this.partOffset = 10;
        
        _scene.dashParticles.createEmitter({
			frame: 'blue',
			x: { min: (this.x - this.partOffset), max: (this.x + this.partOffset) },
			y: { min: (this.y - this.partOffset), max: (this.y + this.partOffset) },
			lifespan: 750,
			speedX: {start:this.speedXParticles * -200, end:0},
			speedY: this.speedYParticles * -100,
			scale: { start:0.1, end: 0 },
			quantity: 0.0000001,
			blendMode: 'ADD'
		});
        
        this.anims.stop().setFrame(11);
    }

    StopDash(_scene)
    {
        //this.canDash = false;
        this.dashing = false;
        this.body.allowGravity = true;

        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        
    }

    StopDashParticles(_scene)
    {
        _scene.dashParticles.destroy()
        _scene.dashedParticles = false
    }
}