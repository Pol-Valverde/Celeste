class baloonPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'baloon')
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
            this.startDestroy,
            null,
            this
        );
        this.anims.play('baloon',true);
        this.body.setAllowGravity(false);
        this.body.immovable = true;

    }

    startDestroy()
    {
        if(!this.beeingDestroyed)
        {
            this.beeingDestroyed = true;
            this.scene.physics.world.disable(this);
            this.anims.stop().setFrame(3);
            this.scene.time.delayedCall(gamePrefs.BALOON_RECOVER_TIME, this.recoverBaloon, [], this);
            this.scene.hero.canDash = true;
            this.scene.hero.dashedAnim = false;

            this.scene.balloon.play();
        }
    }


    recoverBaloon()
    {
        this.anims.play('baloon',true);
        this.beeingDestroyed = false;
        this.scene.physics.world.enable(this);
        
    }
}