class breakeableWallPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'breakeableWall')
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
    }

    startDestroy()
    {
        if(this.scene.hero.dashing)
        {
            //particles
            this.destroy()
        }
    }
}