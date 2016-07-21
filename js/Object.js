/*
  This is a utility object which provides various methods to use
*/

var Object = {
    "distance": function (a, b) {
        return Math.sqrt( (a.position.x - b.position.x) * 
                         (a.position.x - b.position.x) + 
                         (a.position.y - b.position.y) * 
                         (a.position.y - b.position.y) );
    }
};