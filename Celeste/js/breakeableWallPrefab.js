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
            this.scene.dashParticles.createEmitter({
                frame: 'yellow',
                x: { min: (this.x - this.partOffset), max: (this.x + this.partOffset) },
                y: { min: (this.y - 500), max: (this.y + 500) },
                lifespan: 750,
                speedX: {start:this.speedXParticles * -50, end:0},
                speedY: this.speedYParticles * -100,
                scale: { start:0.05, end: 0 },
                quantity: 0.0000001,
                blendMode: 'ADD'
            });
            this.destroy()
        }
    }
}