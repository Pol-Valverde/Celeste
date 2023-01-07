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
            this.scene.wallBroken.play();

            //particles
            this.visible = false
            this.scene.particlesBlock.createEmitter({
                frame: 'yellow',
                x:  this.x  ,
                y: { min: (this.y - 20), max: (this.y + 20) },
                lifespan: 900,
                speedX: {start: 300, end:0},
                speedY:  0,
                scale: { start:0.05, end: 0 },
                quantity: 0.0000001,
                blendMode: 'ADD'
            });
            this.scene.time.delayedCall(300,this.destroyWall,[],this);
        }

    }
    destroyWall()
    {
        this.scene.particlesBlock.destroy();
        this.destroy();
    }
}