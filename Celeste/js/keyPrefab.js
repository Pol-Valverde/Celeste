class keyPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag = 'keySprite')
    {
        super(_scene, _positionX, _positionY, _spriteTag).setScale(4);

        this.scene = _scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.beeingDestroyed = false;

        this.scene.physics.add.overlap
        (
            this,
            this.scene.hero,
            this.keyCatched,
            null,
            this
        );
        this.anims.play('keyAnim',true);
        this.body.setAllowGravity(false);
        this.body.immovable = true;
    }
    keyCatched()
    {
        if(!this.beeingDestroyed)
        {
            this.beeingDestroyed = true;
            this.scene.physics.world.disable(this);
            this.anims.stop().setFrame(3);
            //cridar bool per obrir cofre
            this.scene.keyCatched = true;
        }
    }

}