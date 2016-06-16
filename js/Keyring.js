function Keyring () {
    var obj = {};
    
    obj.pressed = {
        "up":false,
        "down":false,
        "left":false,
        "right":false
    };
    
    obj.press = function (k) {
        if (k === 87 || k === 38) {
            this.pressed.up = true;
        } else if (k === 83 || k === 40) {
            this.pressed.down = true;
        } else if (k === 65 || k === 37) {
            this.pressed.left = true;
        } else if (k === 68 || k === 39) {
            this.pressed.right = true;
        }
    };
    obj.release = function (k) {
        if (k === 87 || k === 38) {
            this.pressed.up = false;
        } else if (k === 83 || k === 40) {
            this.pressed.down = false;
        } else if (k === 65 || k === 37) {
            this.pressed.left = false;
        } else if (k === 68 || k === 39) {
            this.pressed.right = false;
        }
    };
    
    obj.isPressed = function (keyName) {
        if (this.pressed [keyName] === true) { return true; }
        return false;
    };
    
    return obj;
}