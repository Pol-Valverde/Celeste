class breakingGroundPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'box')
    {
        super(_scene, _positionX, _positionY, _spriteTag).setScale(4);

        this.scene = _scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.scene.physics.add.collider
        (
            this,
            this.scene.hero,
            this.startDestroy,
            null,
            this
        );

        this.body.setAllowGravity(false);
        this.body.immovable = true;

        this.beeingDestroyed = false;
    }

    startDestroy()
    {
        if(!this.beeingDestroyed)
        {
            this.beeingDestroyed = true;
            
            this.anims.play('boxDestroy', true); //false?
            this.scene.time.delayedCall(gamePrefs.BREAKINGGROUND_BREAK_TIME, this.breakBlock, [], this);
        }
    }

    breakBlock()
    {
        this.scene.physics.world.disable(this);
        this.scene.time.delayedCall(gamePrefs.BREAKINGGROUND_BREAK_TIME, this.recoverBlock, [], this);
    }

    recoverBlock()
    {
        this.beeingDestroyed = false;

        this.scene.physics.world.enable(this);
        this.anims.stop().setFrame(0);
    }
}