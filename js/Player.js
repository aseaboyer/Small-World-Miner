function Player (xStart, yStart) {
    var obj = {},
        now = Date.now ();
    
    obj.position = {
        x: xStart,
        y: yStart,
        set: function (x, y) {
            this.x = x;
            this.y = y;
        }
    };
    obj.planet = null;
    obj.isOrbiting = false;
    obj.orbitAngle = 0;
    obj.leavePlanet = function () {
        this.planet = null;
        obj.isOrbiting = false;
    };
    obj.orbitPlanet = function (planet, angle) {
        this.planet = planet;
        this.isOrbiting = true;
        this.orbitAngle = angle;
    };
    obj.strokeStyle = 'tomato';
    
    obj.resources = {
        "minerals": 120,
        "gases": 120,
        "max": 400,
        "changeMinerals": function (changeVal) {
            
        },
        "changeGases": function (changeVal) {
            
        },
        "setMinerals": function () {
            
        },
        "setGases": function () {
            
        },
    };
    
    obj.update = function (dt) {
        this.orbitAngle += dt * 0.001;
    };
    obj.draw = function (c) {
        var satLoc = orbitPosition (this.orbitAngle, this.planet.orbitRadius, this.planet.position.x, this.planet.position.y);
        c.beginPath();
        c.arc(satLoc.x, satLoc.y, 5, 0, 2 * Math.PI, false);
        //c.fillStyle = 'tomato';
        //c.fill();
        c.lineWidth = 1;
        c.strokeStyle = this.strokeStyle;
        c.stroke();
    };
    
    /*
    obj.history = new Array ();
    obj.move = function (dir) {
        var newDir = {x:0, y:0};
        if (dir !== "" || dir !== null) {
            // check for direction and translate to an x/y
            if (dir === "up") {
                newDir.y = -1;
            } else if (dir === "right") {
                newDir.x = 1;
            } else if (dir === "down") {
                newDir.y = 1;
            } else if (dir === "left") {
                newDir.x = -1;
            }
            
            // update the history 
            this.history.unshift({
                x: this.position.x,
                y: this.position.y
            });
            
            // if the player is on the board...move them
            if (this.position.x + newDir.x >= 0 &&
                this.position.x + newDir.x < game.board.width &&
                this.position.y + newDir.y >= 0 &&
                this.position.y + newDir.y < game.board.height) {
                    // move the player
                    this.position.x += newDir.x;
                    this.position.y += newDir.y;
            }
        }
    };
    
    obj.healthBar = document.getElementById ("healthBar");
    obj.currentHealth = 100;
    obj.setHealth = function (val) {
        this.currentHealth = val;
        this.healthBar.style.width = this.currentHealth+"%";
    };
    obj.changeHealth = function (val) {
        var newHealth = this.currentHealth + val;
        if (newHealth > 100) { newHealth = 100; }
        if (newHealth < 0) { 
            console.log ("player died");
            game.openKillScreen ();
        } else {
            this.setHealth (newHealth);
        }
    };
    
    
    obj.setHealth (50);*/
    
    return obj;
}