var tileSize = 31;

function Map(map) {
    this.map = map;
    this.mapSize = Math.sqrt(this.map.length);
    this.mapDim = {row : this.map.length, col : this.map[0].length};
    this.canvas = document.getElementById("gameWorld");
    this.tileSize = tileSize;

    switch (map) {
        case map_1:
            this.firstEntry = { column: 0, row: 4 };
            this.secondEntry = { column: 13, row: 0 };
            this.trailChoice = "dirt";
            this.mapNum = 1;
            break;
        case map_2:
            this.firstEntry = { column: 0, row: 17 };
            this.secondEntry = { column: 21, row: 5 };
            this.trailChoice = "dirt";
            this.mapNum = 2;
            break;
        case map_3:
            this.firstEntry = { column: 0, row: 1 };
            this.secondEntry = { column: 11, row: 0 };
            this.trailChoice = "dirt";
            this.mapNum = 3;
            break;
        case map_4:
            this.firstEntry = { column: 0, row: 1 };
            this.secondEntry = { column: 11, row: 0 };
            this.trailChoice = "dirt";
            this.mapNum = 4;
            break;
        case map_5:
            this.firstEntry = { column: 0, row: 1 };
            this.secondEntry = { column: 11, row: 0 };
            this.trailChoice = "dirt";
            this.mapNum = 5;
            break;
        default:
            console.log("Not a valid map");
            break;
    }

}

Map.prototype.constructor = Map;

function Background(game, spritesheet, x, y) {
    this.x = x;
    this.y = y;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
        this.x, this.y);
};

Background.prototype.update = function () { };

//Creates a map based on the selection.
Map.prototype.createMap = function (gameEngine, assetManager) {

    //Draws map
    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./map/map_${this.mapNum}.png`), 0, 0));

    //draws trails on map and get important locations
    for (let i = 0; i < this.mapDim.col; i++) {

        for (let j = 0; j < this.mapDim.row; j++) {
            let cycle = Math.ceil(Math.random() * 6)
            let tile = this.map[j][i];
            switch (tile) {
                case '>':
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/${this.trailChoice}/${this.trailChoice}_${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    break;
                case 'v' :
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/${this.trailChoice}/${this.trailChoice}_${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    break;
                case '^' :
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/${this.trailChoice}/${this.trailChoice}_${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    break;
                case '<' :
                    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/${this.trailChoice}/${this.trailChoice}_${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    break;
                case '=':
                    //gameEngine.addTile(new Background(gameEngine, assetManager.getAsset(`./tiles/${this.tileChoice}/${this.tileChoice}_top${cycle}.png`), i * this.tileSize, j * this.tileSize));
                    this.baseX = i * this.tileSize;
                    this.baseY = j * this.tileSize;
                    break;
                case '*':
                    this.mineralX = i * this.tileSize;
                    this.mineralY = j * this.tileSize;
                    break;
                default:
                    break;
            }
        }
    }
    //Adds base and mineras to their locations
    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset("./tiles/mineral.png"), this.mineralX, this.mineralY));
    gameEngine.addTile(new Background(gameEngine, assetManager.getAsset("./tiles/base.png"), this.baseX, this.baseY));

}


var map_1 =[['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '>', '>', '>', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['>', '>', '>', '>', '>', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '<', '<', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', 'v', '<', '+', '+', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', 'v', '+', '+', '>', '>', '>', '>', '>', '>', '>', '>', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', 'v', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', 'v', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', 'v', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', '>', '>', '>', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
            ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '=', 'b', 'b'],
            ['*', 'f', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '>', '>', '>', '>', 'b', 'b'],
            ['f', 'f', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'b', 'b', 'b']]

var map_2 = [['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '<', '<', '<', '<', '<', '<', '<'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '<', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '<', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '>', '>', '>', 'v', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '^', '+', '+', 'v', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '>', '^', '+', '+', 'v', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '^', '+', '+', '+', 'v', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['>', '>', '>', '^', '+', '+', '+', '>', '>', '>', '>', '>', '>', '>', 'v', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '=', 'v', 'b', '+', '+', '+', '+', '+', '+'],
             ['*', 'f', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'b', 'b', 'b', '+', '+', '+', '+', '+', '+'],
             ['f', 'f', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'b', 'b', 'b', '+', '+', '+', '+', '+', '+']]

var map_3 = [['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '>', '>', '>', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['>', '>', '>', '>', '>', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '<', '<', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', 'v', '<', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '>', '>', '>', '>', '>', '>', '>', '>', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '>', '>', '>', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '=', 'b', 'b'],
             ['*', 'f', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '>', '>', '>', '>', 'b', 'b'],
             ['f', 'f', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'b', 'b', 'b']]

var map_4 = [['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '>', '>', '>', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['>', '>', '>', '>', '>', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '<', '<', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', 'v', '<', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '>', '>', '>', '>', '>', '>', '>', '>', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '>', '>', '>', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '=', 'b', 'b'],
             ['*', 'f', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '>', '>', '>', '>', 'b', 'b'],
             ['f', 'f', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'b', 'b', 'b']]

var map_5 = [['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '>', '>', '>', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['>', '>', '>', '>', '>', 'v', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '<', '<', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', 'v', '<', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '>', '>', '>', '>', '>', '>', '>', '>', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', 'v', '+', '+', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '>', '>', '>', '^', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '+', '+', '+'],
             ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'v', '+', '+', '=', 'b', 'b'],
             ['*', 'f', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '>', '>', '>', '>', 'b', 'b'],
             ['f', 'f', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', 'b', 'b', 'b']]
   

    //WIP - Don't use
    var map_6 = [[{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 34 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '>', v: 46 }, { d: '>', v: 45 }, { d: '>', v: 44 }, { d: 'v', v: 43 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 33 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 42 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '>', v: 32 }, { d: '>', v: 31 }, { d: '>', v: 30 }, { d: '>', v: 29 }, { d: '>', v: 28 }, { d: 'v', v: 27 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 41 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 26 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 40 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 25 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 39 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 22 }, { d: '<', v: 23 }, { d: '<', v: 24 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 38 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 21 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 37 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 20 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 36 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 18 }, { d: '<', v: 19 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 35 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 17 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 34 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 16 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 33 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '>', v: 20 }, { d: '>', v: 19 }, { d: '>', v: 18 }, { d: '>', v: 17 }, { d: '>', v: 16 }, { d: '>', v: 15 }, { d: '>', v: 14 }, { d: '>', v: 13 }, { d: 'v', v: 12 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '>', v: 32 }, { d: '>', v: 31 }, { d: 'v', v: 30 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '^', v: 21 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 11 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 29 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '^', v: 22 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 10 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 28 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '^', v: 23 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 9 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '>', v: 27 }, { d: '>', v: 26 }, { d: '>', v: 25 }, { d: '^', v: 24 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 8 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 7 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 6 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 5 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }],
                 [{ d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'v', v: 4 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '=', v: 0 }, { d: 'b', v: 0 }, { d: 'b', v: 0 }],
                 [{ d: '*', v: 0 }, { d: 'f', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '>', v: 3 }, { d: '>', v: 2 }, { d: '>', v: 1 }, { d: '>', v: 0 }, { d: 'b', v: 0 }, { d: 'b', v: 0 }],
                 [{ d: 'f', v: 0 }, { d: 'f', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: '+', v: 0 }, { d: 'b', v: 0 }, { d: 'b', v: 0 }, { d: 'b', v: 0 }]]

