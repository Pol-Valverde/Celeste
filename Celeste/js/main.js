var gamePrefs=
{
    HERO_JUMP: 125,
    HERO_WALLJUMP_X: 80, //hauria de ser 3,75 tiles
    HERO_WALLJUMP_Y: 80,
    HERO_WALLJUMP_TIME: 255,
    HERO_DASH: 250,
    HERO_SPEED: 64,
    ENEMY_SPEED: 100,
    GRAVITY: 350,
    GAME_WIDTH: 128,
    GAME_HEIGHT: 128,
    LEVEL1_WIDTH: 1280,
    LEVEL1_HEIGHT: 800
}

var config =
{
    type: Phaser.AUTO,
    width: gamePrefs.GAME_WIDTH,
    height: gamePrefs.GAME_HEIGHT,
    scene:[menu, OneHundredM, TwoHundredM, ThreeHundredM, FourHundredM, FiveHundredM], //array con los niveles/pantallas/escenas (unity)
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
            //debug:true
        }
    }
}

var juego = new Phaser.Game(config);