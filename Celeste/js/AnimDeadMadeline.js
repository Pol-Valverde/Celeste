class AnimDeadMadeline extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'deadAnim')
    {
        super(_scene, _positionX, _positionY, _spriteTag).setScale(6);
        this.anims.stop().setFrame(9);
        this.scene = _scene;
        this.scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.body.immovable = true;
        this.positionX = _positionX;
        this.positionY = _positionY;
    }

    show()
    {
        this.anims.play('deadAnimK',true);

    }

}