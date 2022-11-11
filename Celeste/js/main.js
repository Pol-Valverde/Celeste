var gamePrefs=
{
    HERO_JUMP: 350,
    HERO_DASH: 700,
    HERO_SPEED: 150,
    ENEMY_SPEED: 100,
    GRAVITY: 1000,
    GAME_WIDTH:540,
    GAME_HEIGHT:540,
    LEVEL1_WIDTH:1280,
    LEVEL1_HEIGHT:800
}

var config =
{
    type: Phaser.AUTO,
    width: gamePrefs.GAME_WIDTH,
    height: gamePrefs.GAME_HEIGHT,
    scene:[menu,level1], //array con los niveles/pantallas/escenas (unity)
    render:
    {
        pixelArt:true
    },
    scale:
    {
        mode:Phaser.Scale.FIT,
        width:gamePrefs.GAME_WIDTH,
        height:gamePrefs.GAME_HEIGHT,
        autoCenter:Phaser.Scale.CENTER_BOTH
    },
    physics:
    {
        default:'arcade',
        arcade:
        {
            gravity:{y:gamePrefs.GRAVITY},
            debug:true
        }
    }
}

var juego = new Phaser.Game(config);