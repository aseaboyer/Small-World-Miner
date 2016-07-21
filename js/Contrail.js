function Contrail (x, y, s, lt) {
    var obj = {},
        now = Date.now (), deathDate;
    
    obj.size = s;
    obj.position = {
        "x": x,
        "y": y
    };
    obj.lifeTime = lt;
    obj.update = function (dt) {
        this.lifeTime -= dt;
    };
    obj.isAlive = function () {
        if (this.lifeTime <= 0) {
            return false;
        }
        return true;
    }
    obj.draw = function (c) {
        // if it's on screen
        // position it absolutely
        // size is based off the time
        
    };
};