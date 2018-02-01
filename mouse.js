var defenderList = ["marine", "battlecruiser", "ghost"]
var tileSize = 31;


function Mouse(map, ctx) {
    this.selectSquare = {
        width: 31,
        height: 31,
        color: 'rgba(255, 204, 0, .1)', //Yellow 10% transparent
        badColor: 'rgba(255,0,0,.2)' //RED %20
    };

    this.radiusOfFire = {
        radius: 30,
        color: 'rgba(0,0,0, .9)', //white 30%
        thick: 2
    };

    this.resources = {
        marine: -50,
        ghost: -100,
        battlecruiser: -150
    };
    this.canvas = document.getElementById("gameWorld");
    this.ctx = ctx;
    //access to other canvas
    this.map = map;
    this.generator = null;
    this.defenderName = null;
    this.attachListeners();
    this.isBusy = false;

    //Layer 2 canvas for drawing mouse move
    this.canvas2 = document.getElementById("gameWorld2");
    this.ctx2 = this.canvas2.getContext("2d");
    this.drawOffset = true;
}

Mouse.prototype.setGenerator = function(mainGenerator) {
    this.generator = mainGenerator;
}

Mouse.prototype.setMap = function(gameMap) {
    this.map = gameMap;
}

//Function that is called via button in ui.js
Mouse.prototype.selectDefender = function(defenderName) {
    this.isBusy = true; //makes mouse unable to select other defenders, one time drop
    this.defenderName = defenderName;
    console.log("Defender " + this.defenderName + " Selected!");
};


Mouse.prototype.dropTower = function(e) {
    var that = this;
    //Drop tower if something was selected from buttons isBusy = true
    if (this.isBusy) {
        //drop tower on location
        console.log("Dropping tower");
        var mouseLoc = getMousePos(this.canvas, event);
        if (this.defenderName === "marine" || this.defenderName === "ghost") {
            this.generator.createDefender(this.defenderName, mouseLoc.x - 15, mouseLoc.y - 15);
        } else {
            this.generator.createDefender(this.defenderName, mouseLoc.x + 5, mouseLoc.y);
        }

        //Update Resources in UI
        switch (this.defenderName) {
            case "marine":
                that.ui.resourceAdjust(that.resources.marine);
                break;
            case "ghost":
                that.ui.resourceAdjust(that.resources.ghost);
                break;
            case "battlecruiser":
                that.ui.resourceAdjust(that.resources.battlecruiser);
                break;
        }

        //Draw radius of fire - NOT WORKING
        that.ctx.beginPath();
        console.log("Mouse X: " + mouseLoc.x + " Mouse y: " + mouseLoc.y + " radius:" +
            that.radiusOfFire.radius);
        that.ctx.arc(mouseLoc.x, mouseLoc.y, that.radiusOfFire.radius, 0, 2 * Math.PI, false);
        that.ctx.lineWidth = that.radiusOfFire.thick;
        that.ctx.strokeStyle = that.radiusOfFire.color;
        that.ctx.stroke();
        /////

        this.isBusy = false; //set isBusy to false so that they can press a button and place another tower
    } else {
        return;
    }
};

/*
Gets Mouse position*/
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

Mouse.prototype.attachListeners = function() {
    var that = this;
    // Mouse events
    //On mouse click, check if button was selected (isBusy = true), if so drop tower on click location
    that.canvas.addEventListener("click", (e) => {
        if (that.isBusy === true) {
            that.dropTower(e);
            that.ctx2.clearRect(0, 0, that.canvas2.width, that.canvas2.height);
        } else {
            return;
        }
    }, false);


    that.canvas.addEventListener("mousemove", function(e) {
        that.ctx2.clearRect(0, 0, that.canvas2.width, that.canvas2.height);
        if (that.isBusy) {
            var mousePos = getMousePos(that.canvas2, e);
            that.ctx2.beginPath();
            that.ctx2.rect(mousePos.x - 31, mousePos.y - 27, that.selectSquare.width,
                that.selectSquare.height);

            /* This code below is to try to get map array and find where user is selecting based on array and mouse pointer
            DOES NOT FULLY WORK, only registers some + or - signs */
            var mapXI = Math.floor(mousePos.x / 31) - 1;
            var mapYI = Math.floor(mousePos.y / 31);
            //console.log(`XI: ${mapXI}, YI: ${mapYI}`);
            //console.log("Map Tile: " + that.map.map[mapYI].charAt(mapXI));
            var tileID = that.map.map[mapYI].charAt(mapXI);
            if (tileID === "+") {
                that.ctx2.fillStyle = that.selectSquare.badColor;
            } else {
                that.ctx2.fillStyle = that.selectSquare.color;
            }
            that.ctx2.fill();
            /*-------------------*/

        }
    }, false);

    // Key events
    /*
    this.canvas.addEventListener("keydown", function(e) {
        console.log(e);
        console.log("Key Down Event - Char " + e.code + " Code " + e.keyCode);
    }, false);

    this.canvas.addEventListener("keyup", function(e) {

    }, false);

    this.canvas.addEventListener("keypress", function(e) {
        if (e.code === "KeyD") that.d = true;
        that.chars[e.code] = true;
        console.log(e);
        console.log("Key Pressed Event - Char " + e.charCode + " Code " + e.keyCode);
    }, false);

    // Optional events
    this.canvas.addEventListener("contextmenu", function(e) {
        that.click = getXandY(e);
        e.preventDefault();
    }, false);

    this.canvas.addEventListener("mousewheel", function(e) {
        console.log(e);
    }, false);

    console.log('Input started');
*/
}

/* Attach UI for calling updates*/
Mouse.prototype.attachUI = function(ui) {
    this.ui = ui;
}