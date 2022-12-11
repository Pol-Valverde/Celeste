class strawberryPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'TODO')
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
        
        //this.anims.play('strawberryIdle', true); //false? //TODO
    }

    pickedUp()
    {
        //make sprite disappear
        //spawnText
    }
}