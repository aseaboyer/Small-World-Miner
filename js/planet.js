function Planet (x, y, mass, density) {
    var obj = {};
    
    obj.strokeStyle = 'green';
    
    obj.mass = mass;
    obj.density = density;
    // Instead of setting gravity, size and radius based on the orbit/radius vars, base it on the mass and density
    // In the declaration, the player should set (x,y,mass,density) instead
    obj.gravity = {
        distance: mass * 3,
        strength: mass * 0.1
    };
    obj.orbit = mass * (3 * density);
    obj.radius = mass * density;
    obj.orbitRadius = mass * (2 * density);
    obj.orbitSpeed = 0.01;
    obj.position = {
        "x": x,
        "y": y
    };
    obj.inHarvestRange = function (other) {
        if (Object.distance (this, other) <= this.orbitRadius) {
            return true;
        }
        return false;
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
        //c.fillStyle = 'tomato';
        //c.fill();
        c.lineWidth = 1;
        c.strokeStyle = this.strokeStyle;
        c.stroke();
    };
    
    return obj;
}