class cloudPlaformPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'cloudPlatform', _dir)
    {
        super(_scene, _positionX, _positionY, _spriteTag).setScale(4);
        this.spriteScale = 4;

        this.dir = _dir;
        this.yPos = _positionY;

        this.scene = _scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.scene.physics.add.collider
        (
            this,
            this.scene.hero,
        );

        this.body.colliderWorldBounds = false;
        this.body.checkCollision.up = true;
        this.body.checkCollision.down = false;
        this.body.checkCollision.left = false;
        this.body.checkCollision.right = false;

        this.body.immovable = true; //the velocity set still affects the body

        this.body.setVelocityX(gamePrefs.CLOUD_PLATFORM_SPPED * this.dir)

        this.body.setAllowGravity(false);
    }

    preUpdate(time, delta)
    {
        if(this.body.x > gamePrefs.GAME_WIDTH + (this.width * this.spriteScale / 2) || this.body.x < this.width * -this.spriteScale)
        {
            console.log(this.width)

            if(this.dir < 0) {
                this.body.reset((gamePrefs.GAME_WIDTH + (this.width * this.spriteScale / 2)), this.yPos);
            } else {
                this.body.reset(this.width * -this.spriteScale / 2, this.yPos);
            }

            this.body.setVelocityX(gamePrefs.CLOUD_PLATFORM_SPPED * this.dir)
        }
    }
}