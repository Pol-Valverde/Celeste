class chestPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag = 'chest')
    {
        super(_scene, _positionX, _positionY, _spriteTag).setScale(4);

        this.startPosX = _positionX
        this.startPosY = _positionY

        this.scene = _scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.beeingDestroyed = false;
        this.startAnim = false;
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
            if(this.startAnim == false)
            {
                this.startAnim = true;
                this.MoveRight();
                this.scene.time.delayedCall(2000, this.DestroyChest, [], this);

                this.scene.chestShake.play();
            }
            
        }
    }

    MoveRight()
    {
        this.body.setVelocityX(50);
        this.scene.time.delayedCall(50, this.MoveLeft,[], this);
    }

    MoveLeft()
    {
        this.body.setVelocityX(-50);
        this.scene.time.delayedCall(50, this.MoveRight, [], this);
    }

    DestroyChest()
    {
        this.strawberryPrefab = new strawberryPrefab(this.scene, this.startPosX, this.startPosY - 20, 'strawberry');

        this.scene.physics.world.disable(this); 
        this.anims.stop().setFrame(1);

        this.scene.chestOpen.play();
    }
    

}