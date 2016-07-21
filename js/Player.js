function Player (xStart, yStart, rotStart) {
    var obj = {},
        radStart = rotStart * Math.PI / 180,
        now = Date.now ();
    
    obj.size = 5;
    obj.position = {
        x: xStart,
        y: yStart,
        set: function (x, y) {
            this.x = x;
            this.y = y;
        }
    };
    
    obj.mass = 1;
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
    obj.rotation = {
        "value":rotStart,
        "radians":radStart,
        "changeSpeed":0.02,
        "GUI": document.getElementById ("rotation"),
        "update": function (torque) {
            this.value = (this.value + torque) % 360;
            this.radians = this.value * Math.PI / 180;
            this.GUI.innerHTML = this.value.toFixed (1);
        }
    };
    obj.torque = {
        "value": 0,
        "cap": 1,
        "change": function (val) {
            this.value += (val);
            if (this.value > this.cap) { this.value = this.cap; }
            if (this.value < -this.cap) { this.value = -this.cap; }
        }
    };
    obj.rotate = function (val) {
        this.torque.change (val * this.rotation.changeSpeed); 
    };
    obj.speed = {
        "value": 0,
        "max": 1.1,
        acceleration: 0.01,
        "accelerate": function (val) {
            this.value += (val * this.acceleration);
            if (this.value > this.max) { this.value = this.max; }
            if (this.value < -this.max) { this.value = -this.max; }
            this.display ();
        },
        displayItem: document.getElementById ("speed"),
        display: function () {
            this.displayItem.innerHTML = this.value.toFixed (2);
        }
    };
    /*
    obj.currentSpeed = 0;
    obj.maxSpeed = 10;
    obj.acceleration = 0.01;
    obj.accelerate = function (val) {
        this.currentSpeed += (val * this.acceleration); 
    };
    */
    
    obj.bounds = 5;
    obj.strokeStyle = 'tomato';
    
    obj.isOrbitting = function (planet) {
        // returns boolean "is within gravitational range" of the planet in question
        
        return false;
    };
    
    obj.contrails = {
        "objects": new Array (),
        "lifeTime": 1000,
        "lastCreated": now,
        "sizeModifier": 5,
        "calculateSize": function (spd) {
            return spd * this.sizeModifier;
        },
        create: function (x, y, s) {
            var size = this.calculateSize (s);
            this.objects.push (new Contrail (x, y, size, this.lifeTime));
        },
        draw: function (ctx) {
            for (var x = i; i < this.objects.length; i++) {
                this.objects [i].draw (ctx)
            }
        }
    };
    
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
        
        this.rotation.update (this.torque.value);
        
        rad = this.rotation.radians;
        newPos.x = Math.cos(rad) * this.speed.value;
        newPos.y = Math.sin(rad) * this.speed.value;
        
        this.position.x -= newPos.x;
        this.position.y -= newPos.y;
    };
    obj.draw = function (c) {
        var rad = this.rotation.value * Math.PI / 180,
            side = this.size;
        
        for (var i = 0; i < game.planets.length; i++) {
            
        }
        
        c.save ();
        c.translate(this.position.x, this.position.y);
        c.rotate (rad);
        
        // build ship object
        c.beginPath();
        c.moveTo (side, 0);
        c.lineTo (0, side);
        c.lineTo (-side * 1.5, 0);
        c.lineTo (0, -side);
        c.lineTo (side, 0);
        c.lineTo (-side * 1.5, 0);
        
        // stroke outline
        c.lineWidth = 1;
        c.strokeStyle = color.white;
        c.stroke();
        c.closePath();
        
        // draw healthbar
        c.beginPath();
        c.arc(0, 0, side * 2, 0, (2 * Math.PI) * this.durability.ofOne, false);
        c.lineWidth = 1;
        c.strokeStyle = color.white50;
        c.stroke();
        c.closePath();
        
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
    
    obj.durability = {
        "current": 0,
        "max": 10,
        "percent": 100,
        "ofOne": 1,
        "change": function (val) {
            this.current += val;
            this.ofOne = this.current / this.max;
            this.percent = (this.ofOne) * 100;
        },
    };
    
    return obj;
}