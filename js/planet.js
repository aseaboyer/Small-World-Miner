function Planet (orbit, radius, x, y) {
    var obj = {},
        orbitRad = (radius * 1.6);
    
    obj.orbit = orbit;
    obj.radius = radius;
    obj.orbitRadius = orbitRad;
    obj.orbitSpeed = 0.01;
    obj.position = {
        "x": x,
        "y": y
    };
    obj.strokeStyle = 'green';
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
    
    obj.draw = function (c) {
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