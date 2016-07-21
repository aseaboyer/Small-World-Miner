/*
 * Vars
 */
var game, keys,
    player,
    viewport = new Viewport ();

/*
 * Key presses
 */
document.body.addEventListener("keydown", function (e) {
    keys.press (e.keyCode);
});
document.body.addEventListener("keyup", function (e) {
    keys.release (e.keyCode);
});
/*document.getElementById ("restart").addEventListener("click", function (e) {
    game.restart ();
});*/

/*
 * INIT Phase
 */
(function () { // INIT
    var c = document.getElementById ("game");
    game = new Game (c);
    keys = new Keyring ();
    
    game.addPlanet (-200, -200, 1.1, 25, true, true);
    game.addPlanet (200, 200, 1.2, 20, true, true);
    
    player = new Player (0, 0, 0);
    
    /*
    game.spawnCoin ();
    game.spawnEnemy ();
    */
    Draw ();
    GameLoop ();
})();

/*
 * UPDATE Loop
 */
function GameLoop () {
    window.requestAnimationFrame(GameLoop);
    
    var now = Date.now (),
        playerTilt = 0,
        playerDir = 0;
    
    // get sthe size of the body/html/screen, set the canvas dimmensions to taht size
    
    if (now >= (game.time.last + game.time.frequency) &&
       game.paused === false) {
        /*
            Updates
        */
        game.time.update ();
        game.update ();
        
        // @aseaboyer - shove below into the player update?
        if (keys.isPressed ("left")) {
            playerTilt--;
        }
        if (keys.isPressed ("right")) {
            playerTilt++;
        }
        if (playerTilt !== 0) {
            player.rotate (playerTilt);
        }
        
        if (keys.isPressed ("up")) {
            playerDir++;
        }
        if (keys.isPressed ("down")) {
            playerDir--;
        }
        if (playerDir !== 0) {
            player.speed.accelerate (playerDir);
        }
        
        player.update (game.time.delta);
        //console.log (object.distance (player, game.planets [0]));
        
        //player.move (keys.current.state);

        /*
            Execute Draws
        */
        Draw ();
    }
};

function Draw () {
    // clear and reset canvas
    game.clearCanvas ();
    
    game.draw ();
}



function orbitPosition (angle, radius, cx, cy) {
    c = Math.cos(angle);
    s = Math.sin(angle);
    /*document.getElementById("cir").style.left=x
    document.getElementById("cir").style.top=y
    document.getElementById("circle").innerHTML="Circle x = "+parseInt(x)
    document.getElementById("circle2").innerHTML="Circle y = "+parseInt(y)*/
    return {
        "x": (radius * c) + cx,
        "y": (radius * s) + cy
    };
}

function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}