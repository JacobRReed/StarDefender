
function Generator(engine, map, assetManager) {
    this.doc = document.getElementById("gameWorld");
    this.gameEngine = engine;
    this.map = map;
    this.AM = assetManager;
}

//Creates enemy of specified type at beginning of given map
Generator.prototype.createEnemy = function (enemyName) {
    this.gameEngine.addEntity(new GroundUnit(this.gameEngine, enemyName, this.map.dIni, this.map, this.AM, 1));
}

//Creates defender of given type at a location specified by the mouse
Generator.prototype.createDefender = function (defenderName, x, y) {
    this.gameEngine.addEntity(new Defender(this.gameEngine, defenderName, x, y, this.map, this.AM));
}




