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
    obj.colors = {
        player: "47,181,243",
        enemy: "252,130,195",
        coin: "225,200,41",
        spawningEnemy: "0,0,0"
    };
    
    obj.clearCanvas = function () {
        this.canvas.height = this.canvas.clientHeight;
        this.canvas.width = this.canvas.clientWidth;
        this.context.clearRect (0, 0, this.canvas.width, this.canvas.height);
    };
    
    obj.drawBit = function (x, y, color, alpha) {
        var color = "rgba(" + color + "," + alpha + ")";
        obj.context.fillStyle = color;
        obj.context.fillRect ( (x * obj.bitSize), (y * obj.bitSize),
            obj.bitSize, obj.bitSize);
    };
    
    obj.purse = document.getElementById ("purse");
    obj.coin = {};
    obj.coinsCollected = 0;
    obj.spawnCoin = function () {
        var x = Math.floor(Math.random() * this.board.width),
            y = Math.floor(Math.random() * this.board.height);
        this.coin = new Coin (x, y);
    };
    obj.collectCoin = function () {
        this.coinsCollected++;
        this.spawnCoin ();
        this.purse.innerHTML = this.coinsCollected;
        player.changeHealth (3);
    };
    
    obj.enemies = new Array ();
    obj.lastSpawnedEnemy = 0;
    obj.maxSpawnFrequency = 2000;
    obj.spawnEnemy = function () {
        var x = Math.floor(Math.random() * this.board.width),
            y = Math.floor(Math.random() * this.board.height);
        this.enemies.push (new Enemy (x, y));
        this.lastSpawnedEnemy = Date.now ();
    };
    obj.removeEnemy = function (num) {
        this.enemies.splice (num, 1);
        //this.spawnEnemy ();
    };
    
    document.body.dataset.killScreen = "false";
    obj.killScreen = false;
    obj.openKillScreen = function () {
        document.body.dataset.killScreen = "true";
        this.paused = true;
    };
    
    obj.restart = function () {
        location.reload ();
    };
    
    return obj;
}