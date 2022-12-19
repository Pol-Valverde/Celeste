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
        this.body.immovable = true;

        this.beeingDestroyed = false;
        
        this.steps = 3;
        this.stepLength = 10;
        this.it = 0;

        //this.anims.play('strawberryIdle', true); //false? //TODO

        this.scene.time.delayedCall(100, this.moveAnimation, [], this);
    }

    moveAnimation()
    {
        if(this.i < this.stepLength)
        {
            i++;
        }
        else
        {
            i--;
        }

        this.scene.time.delayedCall(100, this.moveAnimation, [], this);
    }

    pickedUp()
    {
        //make sprite disappear
        //spawnText
    }

    
}