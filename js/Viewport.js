function Viewport (x, y) {
    var obj = {},
        now = Date.now ();
    
    obj.zoom = {
        "current": 1,
        "min": 0,
        "max": 5
    };
    obj.bounds = {
        "start": {
            "x": 0,
            "y": 0
        },
        "end": {
            "x": 0,
            "y": 0
        },
        set: function (center, w, h) {
            this.start.x = center.x - w/2;
            this.start.y = center.y - h/2;
            this.end.x = center.x + w/2;
            this.end.y = center.y + h/2;
        },
        get: function (x, y) {
            return this;
        }
    };
    
    return obj;
}