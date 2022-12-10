class heroPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'madeline')
    {
        super(_scene, _positionX, _positionY, _spriteTag).setScale(1);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        //_scene.physics.add.existing(this); 
        this.cursores = _scene.input.keyboard.createCursorKeys();

        this.canDash = true;

        this.wallSliding = false;
        this.wallJumping = false;
        this.lastXDir = 0;
        this.canWallJump = false;
        this.dashedAnim = false;
        this.isCUp = true;
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
            this.body.velocity.y = 20;

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
            console.log(this.lastXDir);

            if(!this.body.onWall())
            {
                this.canWallJump = false;
            }
        }
    }

    WallJump(_scene)
    {
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
			speedX: { min: 25 / 4, max: 50 / 4 },
			speedY: { min:-10 / 4, max: 10 / 4},
			scale: { start: 0.025 / 4, end: 0 },
			quantity: 0.0000001,
			blendMode: 'ADD'
		});
        
        this.anims.stop().setFrame(11);
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
        _scene.dashedParticles = false
    }
}