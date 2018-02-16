var AM = new AssetManager();

//load defender sprites
var defenderAction = ["stand", "shoot", "projectile"]
var defenderList = ["marine", "battlecruiser", "ghost", "antiair", "dropship"];
for (let i = 0; i < defenderList.length; i++) {
    for (let j = 0; j < defenderAction.length; j++) {
        AM.queueDownload(`./img/${defenderList[i]}/${defenderList[i]}_${defenderAction[j]}.png`);
    }
}

//load enemy sprites
var directions = ["east", "west", "north", "south", "ne", "nw", "se", "sw", "death"];
var unitList = ["mutalisk", "queen", "zergling", "ultralisk", "hydralisk", "defiler", "scourge", "dropship",
    "sarahkerrigan", "devourer", "overlord"
];
for (let i = 0; i < unitList.length; i++) {
    for (let j = 0; j < directions.length; j++) {
        AM.queueDownload(`./img/${unitList[i]}/${unitList[i]}_${directions[j]}.png`);
    }
}

//load scv sprites
AM.queueDownload("./img/scv/scv_east.png");
AM.queueDownload("./img/scv/scv_west.png");
AM.queueDownload("./img/scv/scv_mine.png");

//load tiles
for (let i = 1; i <= 6; i++) {
    AM.queueDownload(`./tiles/grass/grass_top${i}.png`);
    AM.queueDownload(`./tiles/grass/grass_bot${i}.png`);
    AM.queueDownload(`./tiles/blue/blue_top${i}.png`);
    AM.queueDownload(`./tiles/blue/blue_bot${i}.png`);
    AM.queueDownload(`./tiles/dirt/dirt_${i}.png`);
}

AM.queueDownload(`./tiles/blue/blue_mount.png`);

AM.queueDownload("./tiles/grass/grass.png");
AM.queueDownload("./tiles/base.png")
AM.queueDownload("./tiles/mineral.png");

AM.downloadAll(function() {
    var canvas = document.getElementById("gameWorld");
    canvas.focus();
    var ctx = canvas.getContext("2d");
    var map = new Map(map_1);
    var myMouse = new Mouse(map, ctx);

    //UI Load
    canvas.style.outlineColor = "#000000"; //prevent highlighting
    var ui = new UI(myMouse, 100, 100, 20000, 1, 0, 0);
    myMouse.attachUI(ui);

    var gameEngine = new GameEngine(myMouse, ui);
    myMouse.init(gameEngine);


    //This generator will allow us to easily create enemies or towers and not just in main when the code first loads
    this.generator = new Generator(gameEngine, map, AM, ui);
    myMouse.setGenerator(this.generator);


    this.wave = new Wave(this.generator, gameEngine, ui);
    gameEngine.wave = this.wave;

    //Game Engine Start
    gameEngine.init(ctx);
    gameEngine.start();

    //Attach gameengine to ui
    ui.attachEngine(gameEngine);

    //Map Load
    map.createMap(gameEngine, AM);
});