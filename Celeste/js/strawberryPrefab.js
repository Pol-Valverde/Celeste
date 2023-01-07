class strawberryPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'strawberry')
    {
        super(_scene, _positionX, _positionY, _spriteTag).setScale(4);

        this.scene = _scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.scene.physics.add.overlap
        (
            this,
            this.scene.hero,
            this.pickedUp,
            null,
            this
        );

        this.body.setAllowGravity(false);
        //this.body.immovable = false;

        this.beeingDestroyed = false;
        
        this.vel = 30
        this.animState = 0
        this.animDirection = 1
        this.maxStates = 2

        this.timeToStop = 350 

        this.pickedUpBerry = false

        this.body.setVelocityY(-this.vel)
        this.scene.time.delayedCall(220, this.updateAnim, [], this);

        this.strawBerry = this.scene.sound.add('strawBerry');
    }

    updateAnim()
    {
        if(!this.pickedUpBerry)
        {
            if(this.animDirection == 1)
            {
                this.body.setVelocityY(this.vel)
                this.animDirection = -1
            }
            else
            {
                this.body.setVelocityY(-this.vel)
                this.animDirection = 1
            }
        
            this.scene.time.delayedCall(this.timeToStop, this.stopAnim, [], this);
        }
    }

    stopAnim()
    {
        if(!this.pickedUpBerry)
        {
            this.body.setVelocityY(0)
        
            this.scene.time.delayedCall(220, this.updateAnim, [], this);
        }
    }

    pickedUp()
    {
        if (!this.pickedUpBerry)
        {
            this.body.setVelocityY(-50)
            this.pickedUpBerry = true
        
            this.anims.play('textFloat', false)
            this.scene.time.delayedCall(1000, this.stopCompletly, [], this);

            this.strawBerry.play();
        }
    }

    stopCompletly()
    {
        this.alpha = 0
        this.body.setVelocityY(0)
    }
}