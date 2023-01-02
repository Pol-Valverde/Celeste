class inGametimer extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'textBackground')
    {
        super(_scene, _positionX, _positionY, _spriteTag).setScale(4);

        this.scene = _scene;
        this.scene.add.existing(this);

        this.positionX = _positionX;
        this.positionY = _positionY;

        this.first = true;
        this.show();
    }

    show()
    {
        if(!this.first)
        {
            this.scene.timeText.visible = false;
            this.visible = false;
        } else {
            this.first = false;
        }
        
        this.visible = true;

        this.hours = Phaser.Math.RoundTo(totalTime / 3600000, 0) % 60;
        this.minutes = Phaser.Math.RoundTo(totalTime / 60000, 0) % 60;
        this.seconds = Phaser.Math.RoundTo(totalTime / 1000, 0) % 60;
        console.log(totalTime);

        this.scene.timeText = this.scene.add.text
		(
			this.positionX,
			this.positionY - 2,
			this.hours.toString() + ' : ' + this.minutes.toString() + ' : ' + this.seconds.toString(),
			{
				fontFamily: 'Symtext',
				fill: '#ffffff',
				fontSize: 18
				
			}
		).setOrigin(.5);

        this.scene.time.delayedCall(1000, this.hide, [], this);
    }

    hide()
    {
        this.scene.timeText.visible = false;
        this.visible = false;
    }
}