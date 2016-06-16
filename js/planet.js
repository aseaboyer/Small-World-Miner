function Planet (orbit, radius, x, y) {
    var obj = {},
        orbitRad = (radius * 1.9);
    
    obj.orbit = orbit;
    obj.radius = radius;
    obj.orbitRadius = orbitRad;
    obj.orbitSpeed = 0.01;
    obj.position = {
        "x": x,
        "y": y
    };
    obj.strokeStyle = 'green';
    obj.gravity = {
        distance: radius * 3,
        strength: radius
    };
    /*
    "orbit": 1.6,
    "radius": 4,
    "speed":0.01,
    "angle":0
    */
    
    obj.resources = {
        "minerals": 120,
        "gases": 120,
        "max": 400,
        "recoup": 2
        /*"changeMinerals": function (changeVal) {
            
        },
        "changeGases": function (changeVal) {
            
        },
        "setMinerals": function () {
            
        },
        "setGases": function () {
            
        }*/
    };
    
    obj.miner = null;
    obj.satellite = null;
    obj.createMiner = function () {
        this.miner = new Miner (this);
    };
    obj.createSatellite = function () {
        this.satellite = new Satellite (this);
    };
    
    obj.update = function (dt) {
        // Update the constructs
        if (this.miner != null) {
            this.miner.update (dt);
        }
        if (this.satellite != null) {
            this.satellite.update (dt);
        }
    };
    obj.draw = function (c) {
        this.drawPlanet (c); // Draw the planet
        
        // Draw the constructs
        if (this.miner != null) {
            this.miner.draw (c);
        }
        if (this.satellite != null) {
            this.satellite.draw (c);
        }
        
    };
    obj.drawPlanet = function (c) {
        // Draw the planet
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        c.fillStyle = 'tomato';
        //c.fill();
        c.lineWidth = 1;
        c.strokeStyle = this.strokeStyle;
        c.stroke();
    };
    
    return obj;
}