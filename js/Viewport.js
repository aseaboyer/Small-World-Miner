function Viewport (x, y) {
    var obj = {},
        now = Date.now ();
    
    obj.zoom = {
        "current": 1,
        "min": 0,
        "max": 5
    };
    obj.bounds = {
        "center": {
            "x": 0,
            "y": 0
        },
        "targetCenter": {
            "x": 0,
            "y": 0
        },
        "start": {
            "x": 0,
            "y": 0
        },
        "end": {
            "x": 0,
            "y": 0
        },
        "set": function (center, w, h) {
            this.start.x = center.x - w/2;
            this.start.y = center.y - h/2;
            this.end.x = center.x + w/2;
            this.end.y = center.y + h/2;
        },
        "get": function (x, y) {
            return this;
        },
        "transitionSpeed": 1
    };
    obj.save = function (c) {
        // sets position, then saves
        // DON'T Allow this to nest!
    };
    obj.restore = function (c) {
        // restores to the upper right corner
        // DON'T Allow this to nest!
        
    };
    obj.update = function (center, width, height) {
        //console.log (center)
        // Called at the end of update,
        // handles the camera transitions
        // center is an x/y position
        var widthMod = width * this.zoom.current,
            heightMod = height * this.zoom.current,
            halfWidth, halfHeight;
        halfWidth = widthMod * 0.5;
        halfHeight = heightMod * 0.5;
        
        this.bounds.targetCenter.x = center.x;
        this.bounds.targetCenter.y = center.y;
        
        this.bounds.start.x = halfWidth - center.x;
        this.bounds.start.y = halfHeight - center.y;
        // @aseaboyer - temp, later, use translation
        /* this.bounds.center.x = center.x;
        this.bounds.center.y = center.y; */
    };
    obj.center = function (c) {
        // At the start of the draw phase,
        // Set the context position
        c.translate(this.bounds.start.x, this.bounds.start.y);
    };
    
    obj.withinScene = function (pos, size) {
        // checks to see if the object should be rendered
        // Use distance from center or bounds
        
        return true;
    };
    
    return obj;
}