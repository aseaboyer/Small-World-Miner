function Player (xStart, yStart, rotStart) {
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
    /*
    @aseaboyer - replace current piece-meal items with this later
    obj.rotation = {
        "value": rotStart,
        "radians": radianStart,
        "torque": 0,
        "speed": 0.001,
        "rotate": function (val) {
            this.torque += (val * this.speed);
        },
    };*/
    obj.rotation = rotStart;
    obj.torque = 0;
    obj.rotationSpeed = 0.001;
    obj.rotate = function (val) {
        this.torque += (val * this.rotationSpeed); 
    };
    obj.currentSpeed = 0;
    obj.maxSpeed = 10;
    obj.acceleration = 0.01;
    obj.accelerate = function (val) {
        this.currentSpeed += (val * this.acceleration); 
    };
    
    obj.bounds = 5;
    obj.strokeStyle = 'tomato';
    
    obj.isOrbitting = function (planet) {
        // returns boolean "is within gravitational range" of the planet in question
        
        return false;
    };
    
    /*
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
    */
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
        var newPos = {},
            rad;
        
        this.rotation += this.torque;
        rad = this.rotation * Math.PI / 180
        
        newPos.x = Math.cos(rad) * this.currentSpeed;
        newPos.y = Math.sin(rad) * this.currentSpeed;
        
        this.position.x += newPos.x;
        this.position.y += newPos.y;
    };
    obj.draw = function (c) {
        var rad = this.rotation * Math.PI / 180;
        //var satLoc = orbitPosition (this.orbitAngle, this.planet.orbitRadius, this.planet.position.x, this.planet.position.y);
        
        /*c.beginPath();
        c.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, false);
        c.lineWidth = 1;
        c.strokeStyle = this.strokeStyle;
        c.stroke();
        */
        
         // Correct draw, wrong position?
        c.save ();
        c.translate(this.position.x, this.position.y);
        c.rotate (rad);
        
        // build triangle object
        c.beginPath();
        c.moveTo(0,-5);
        c.lineTo(0,5);
        c.lineTo(5,5);
        c.lineTo(0,-5);
        c.lineTo(-5,5);
        c.lineTo(0,5);
        //c.closePath();
        // stroke outline
        c.lineWidth = 1;
        c.strokeStyle = 'white';
        c.stroke();
        
        c.restore ();
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