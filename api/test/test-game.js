var Game = require('../game.js');

(function testGame() {
    var id = 1000;
    var myGame = new Game(1000);
    
    //set up the game
    console.log(myGame.setup());
    
    //retrieve state of the game
//    console.log(myGame.getGameState().boardAsString);
    
    //wrong movement
    console.log(myGame.move('white', 'b',7, 'b',6));
    
    //wrong movement
    console.log(myGame.move('black', 'b',7, 'b',6));
    
    //correct movement
    console.log(myGame.move('white', 'b',2,'b',4));
    
    //wrong movement
    console.log(myGame.move('white', 'c',2,'c',4));
    
    //correct movement
    console.log(myGame.move('black', 'f',7,'f',5));
    
    //retrieve state of the game
//    console.log(myGame.getGameState().boardAsString);
    
    //testing check
    console.log(myGame.move('white', 'g',1,'h',3));
    console.log(myGame.move('black', 'e',8,'f',7));
    console.log(myGame.move('white', 'h',3,'g',5));
    
    
    //testing movement after check
    console.log(myGame.move('black', 'a',7,'a',6));
    console.log(myGame.getGameState().boardAsString);
    
    //testing capturing a piece by the king
    console.log(myGame.move('black', 'f',7,'f',6));
    console.log(myGame.move('white', 'c',1,'b',2));
    console.log(myGame.move('black', 'f',6,'g',5));
    console.log(myGame.getGameState().boardAsString);
    console.log(myGame.getGameState().numberOfPieces);
    
    //testing capturing a piece by any other piece
    console.log(myGame.move('white', 'b',2, 'g',7));
    console.log(myGame.getGameState().boardAsString);
    console.log(myGame.getGameState().numberOfPieces);
    
})();