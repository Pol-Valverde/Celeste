class springPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'TODO')
    {
        super(_scene, _positionX, _positionY, _spriteTag).setScale(4);

        this.scene = _scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.scene.physics.add.collider
        (
            this,
            this.scene.hero,
            this.makePlayerJump,
            null,
            this
        );

        this.body.setAllowGravity(false);
        this.body.immovable = true;

        this.beeingDestroyed = false;
    }

    makePlayerJump(_gem,_hero)
    {
        //this.anims.play('springBounce', true); //false? //TODO
    }
}