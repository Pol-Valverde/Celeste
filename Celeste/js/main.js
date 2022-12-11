var gamePrefs=
{
    HERO_JUMP: 500, // Jan [11/12/2022]: Updated these
    HERO_WALLJUMP_X: 320, // Jan [11/12/2022]: Updated these || //hauria de ser 3,75 tiles
    HERO_WALLJUMP_Y: 320, // Jan [11/12/2022]: Updated these
    HERO_WALLJUMP_TIME: 255,
    HERO_DASH: 1000, // Jan [11/12/2022]: Updated these
    HERO_SPEED: 256, // Jan [11/12/2022]: Updated these
    BREAKINGGROUND_BREAK_TIME: 1500,
    BREAKINGGROUND_RECOVER_TIME: 1000,
    ENEMY_SPEED: 100,
    GRAVITY: 1400, // Jan [11/12/2022]: Updated these
    GAME_WIDTH: 512, // Jan [11/12/2022]: Updated this
    GAME_HEIGHT: 512, // Jan [11/12/2022]: Updated this
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