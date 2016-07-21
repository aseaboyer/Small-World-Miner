function Satellite (planet) {
    var obj = {},
        now = Date.now ();
    
    obj.planet = planet;
    obj.orbitAngle = 0;
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
        this.orbitAngle += dt * 0.0002;
    };
    obj.draw = function (c) {
        var satLoc = orbitPosition (this.orbitAngle, this.planet.orbitRadius, this.planet.position.x, this.planet.position.y);
        
        c.save ();
        c.translate(satLoc.x, satLoc.y);
        c.rotate (this.orbitAngle);
        
        // build triangle object
        c.beginPath();
        c.moveTo(0,0);
        c.lineTo(5, -5);
        c.lineTo(5, 5);
        c.closePath();
        // stroke outline
        c.lineWidth = 1;
        c.strokeStyle = 'tomato';
        c.stroke();
        
        c.restore ();
    };
    
    return obj;
}