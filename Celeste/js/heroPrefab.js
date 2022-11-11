class heroPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag='hero')
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        //_scene.physics.add.existing(this); 
        this.cursores = _scene.input.keyboard.createCursorKeys();

        this.canDash = true;
        
        //this.timedEvent = this.time.delayedCall(3000, StopDash, [], this);
    }

    preUpdate(time,delta)
    {
        if(this.canDash)
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
                this.anims.stop().setFrame(6);
            }
        }
        else
        {
            //dashAnim???
        }

        super.preUpdate(time, delta);
    }

    JustDashed(_scene)
    {
        this.canDash = false;
        this.body.allowGravity = false;
        
        //velocity
        if(this.cursores.up.isDown)
        {
            this.body.setVelocityY(-gamePrefs.HERO_DASH);
        }
        else if(this.cursores.down.isDown)
        {
            this.body.setVelocityY(gamePrefs.HERO_DASH);
        }

        if(this.cursores.right.isDown)
        {
            this.body.setVelocityX(gamePrefs.HERO_DASH);
        }
        else if(this.cursores.left.isDown)
        {
            this.body.setVelocityX(-gamePrefs.HERO_DASH);
        }
    }
    StopDash(_scene)
    {
        this.canDash = true;
        this.body.allowGravity = true;

        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
    }
}