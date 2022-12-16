class chestPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag = 'chest')
    {
        super(_scene, _positionX, _positionY, _spriteTag).setScale(4);

        this.scene = _scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.beeingDestroyed = false;

        this.scene.physics.add.collider
        (
            this,
            this.scene.hero,
            null,
            null,
            this
        );
        this.anims.play('chestAnim',true);
        this.body.setAllowGravity(false);
        this.body.immovable = true;
        
    }
    preUpdate()
    {
        if(this.scene.keyCatched == true)
        {
            console.log("Hello");
            this.scene.physics.world.disable(this); 
            this.anims.stop().setFrame(1);
        }
        
    }

}