function Game (canvas) {
    var obj = {},
        now = Date.now ();
    
    obj.paused = false;
    obj.canvas = canvas;
    obj.context = canvas.getContext ("2d");
    obj.bitSize = 4;
    obj.board = {
      height:  (canvas.height / obj.bitSize), 
      width:  (canvas.width / obj.bitSize)
    };
    obj.purse = document.getElementById ("coinCount");
    
    obj.frame = {
        current: 0,
        frequency: 50,
        last: now,
        update: function () {
            this.current++;
            this.last = Date.now ();
        }
    };
    // Replace frame with time to use deltatime
    obj.time = {
        current: now,
        delta: 0,
        frequency: 50,
        last: now,
        update: function () {
            var n = Date.now ();
            this.last = this.current;
            this.current = n;
            this.delta = (this.current - this.last);
        }
    };
    
    obj.clearCanvas = function () {
        this.canvas.height = this.canvas.clientHeight;
        this.canvas.width = this.canvas.clientWidth;
        this.context.clearRect (0, 0, this.canvas.width, this.canvas.height);
    };
    
    obj.update = function () {
        for (var i = 0; i < this.planets.length; i++) {
            this.planets [i].update (this.time.delta);
        }
        
        viewport.update (player.position, this.canvas.width,   
                        this.canvas.height);
    };
    
    obj.draw = function () {
        /* MOVE VIEWPORT */
        viewport.center (this.context);
                            
        /* TEST PLANETS */
        for (var i = 0; i < this.planets.length; i++) {
            this.planets [i].draw (this.context);
        }
        
        /* DRAW THE PLAYER */
        player.draw (this.context);
    };
    
    obj.planets = [];
    //obj.addPlanet = function (x, y, orbit, radius, hasS, hasM) {
    obj.addPlanet = function (x, y, mass, density, hasS, hasM) {
        var newPlanet = new Planet (x, y, mass, density);
        //var newPlanet = this.planets [this.planets.length-1];
        //console.log (newPlanet);
        if (hasS === true) {
            newPlanet.createSatellite ();
        }
        if (hasM === true) {
            newPlanet.createMiner ();
        }
        
        this.planets.push (newPlanet);
    };
    
    return obj;
}