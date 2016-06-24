/*
 * Vars
 */
var game, keys,
    player,
    planets = new Array ();

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
    
    planets.push (new Planet (1.2, 20, 200, 200));
    planets [0].createSatellite ();
    planets [0].createMiner ();
    
    player = new Player (c.clientWidth * 0.5, c.clientHeight * 0.5, 90);
    //player.orbitPlanet (planets [0], 0);
    
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
        
        for (var i = 0; i < planets.length; i++) {
            planets [i].update (game.time.delta);
        }
        
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
            playerDir--;
        }
        if (keys.isPressed ("down")) {
            playerDir++;
        }
        if (playerDir !== 0) {
            player.accelerate (playerDir);
        }
        
        player.update (game.time.delta);
        
        //player.move (keys.current.state);

        /*
            Execute Draws
        */
        Draw ();
    }
    
    //console.log (keys.current);
};

function Draw () {
    // clear and reset canvas
    game.clearCanvas ();
    
    
    /* TEST DRAW A GREEN PLANET */
    for (var i = 0; i < planets.length; i++) {
        planets [i].draw (game.context);
    }
    
    /* Added to clearCanvss
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
    */
    /*
    game.context.beginPath();
    game.context.arc(planets [0].position.x, planets [0].position.y, planets [0].radius, 0, 2 * Math.PI, false);
    game.context.fillStyle = 'green';
    //game.context.fill();
    game.context.lineWidth = 1;
    game.context.strokeStyle = 'green';
    game.context.stroke();/*
    
    /* DRAW THE PLAYER (MOON) */
    player.draw (game.context);
    
    /*
    // player
    for (var j = 0; j < (player.history.length >= 4 ? 4 : player.history.length); j++) {
        game.drawBit (player.history [j].x, player.history [j].y,
                  game.colors.player, "0." + (-j+5));
    }
    game.drawBit (player.position.x, player.position.y,
                  game.colors.player, "1");
    
    // coin actions
    if (player.position.x === game.coin.x &&
        player.position.y === game.coin.y) {
        game.collectCoin ();
        
    } else {
        game.drawBit (game.coin.x, game.coin.y,
                  game.colors.coin, "1");
    }
    
    // enemies
    for (var i = 0; i < game.enemies.length; i++) {
        game.enemies [i].update ();
        
        // Check to see if it's offscreen - use player check
        if (game.enemies [i].position.x >= 0 &&
            game.enemies [i].position.x < game.board.width &&
            game.enemies [i].position.y >= 0 &&
            game.enemies [i].position.y < game.board.height) {
            
            game.drawBit (game.enemies [i].position.x, 
                game.enemies [i].position.y,
                game.colors.enemy, "1");
            for (var j = 0; j < (game.enemies [i].history.length >= 4 ? 4 : game.enemies [i].history.length); j++) {
                if (game.enemies [i].spawning) {
                    game.drawBit (game.enemies [i].history [j].x,
                            game.enemies [i].history [j].y,
                            game.colors.spawningEnemy, "0." + (-j+5));
                } else {
                    game.drawBit (game.enemies [i].history [j].x,
                            game.enemies [i].history [j].y,
                            game.colors.enemy, "0." + (-j+5));
                }
            }
        } else {
            game.removeEnemy (i);
        }
    }
    
    // check for enemy impacts with player
    for (var i = 0; i < game.enemies.length; i++) {
        if (game.enemies [i].position.x === player.position.x &&
            game.enemies [i].position.y === player.position.y &&
            game.enemies [i].spawning === false) {
                player.changeHealth (-30);
        }
    }
    
    
    // spawn a new enemy - progressively more enemies
    if (game.enemies.length < (game.coinsCollected/2) ||
        game.enemies.length <= 0) {
        game.spawnEnemy ();
    }*/
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