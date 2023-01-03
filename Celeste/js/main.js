var gamePrefs=
{
    HERO_JUMP: 365,
    HERO_WALLJUMP_X: 320,//hauria de ser 3,75 tiles
    HERO_WALLJUMP_Y: 300,
    HERO_WALLJUMP_TIME: 255,
    HERO_DASH: 450,
    HERO_SPEED: 256,
    HERO_DASHTIME:250,
    CLOUD_PLATFORM_SPPED: 50,
    BREAKINGGROUND_BREAK_TIME: 1500,
    BREAKINGGROUND_RECOVER_TIME: 1000,
    BALOON_RECOVER_TIME: 1300,
    ENEMY_SPEED: 100,
    GRAVITY: 850,
    GAME_WIDTH: 512,
    GAME_HEIGHT: 512,
    LEVEL1_WIDTH: 1280,
    LEVEL1_HEIGHT: 800,
    MUTE: false
}

var  totalTime = 0;

var config =
{
    type: Phaser.AUTO,
    width: gamePrefs.GAME_WIDTH,
    height: gamePrefs.GAME_HEIGHT,
    scene:[menu, OneHundredM, TwoHundredM, ThreeHundredM, FourHundredM, FiveHundredM, SixHundredM, SevenHundredM], //array con los niveles/pantallas/escenas (unity)
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