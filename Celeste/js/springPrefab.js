class springPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'spring')
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
        
        this.anims.play('springBounce', true);
        this.anims.stop().setFrame(1);
    }

    makePlayerJump(_hero)
    {
        this.scene.spring.play();

        this.scene.hero.body.setVelocityY(-475)

        this.anims.play('springBounce', true);
    }
}