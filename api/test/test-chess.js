var Position = require('../position.js');
var Board = require('../chess.js');

function equals(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

(function testMovePiece() {
    var myBoard = new Board();
    myBoard.setup();
    
    console.log(myBoard.toString());
    
    console.log( myBoard.movePiece( new Position('d',2), new Position('d',4) ));
    console.log(myBoard.toString());    //valid 2-square pawn movement
    
    console.log( myBoard.movePiece( new Position('d',7), new Position('d',5) ));
    console.log(myBoard.toString());    //valid 2-square pawn movement
    
    console.log( myBoard.movePiece( new Position('f',2), new Position('f',4) ));
    console.log(myBoard.toString());    //invalid 2-square pawn movement
    
    console.log( myBoard.movePiece( new Position('d',7), new Position('d',5) ));
    console.log(myBoard.toString());    //no piece in this position
    
    console.log( myBoard.movePiece( new Position('c',1), new Position('f',4) ));
    console.log(myBoard.toString());
    
    console.log( myBoard.movePiece( new Position('h',8), new Position('d',8) ));
    console.log(myBoard.toString());
    
    console.log( myBoard.movePiece( new Position('f',4), new Position('c',7) ));
    console.log(myBoard.toString());
    
    //testing king movement
    console.log( myBoard.movePiece( new Position('e',8), new Position('d',7) ));
    console.log(myBoard.toString());
    console.log( myBoard.movePiece( new Position('d',7), new Position('d',6) ));
    console.log(myBoard.toString());    //the black king's in check
    
})();

//(function testCheck() {
//    var myBoard = new Board();
//    myBoard.setup();
//    logCheck(myBoard,'white');
//    logCheck(myBoard,'black');
//    
//    myBoard.setupCheck(1);
//    console.log(myBoard.toString());
//    logCheck(myBoard, 'white');
//    logCheck(myBoard, 'black');
//    
//    myBoard.setupCheck(2);
//    console.log(myBoard.toString());
//    logCheck(myBoard, 'white');
//    logCheck(myBoard, 'black');
//    
//    myBoard.setupCheck(3);
//    console.log(myBoard.toString());
//    logCheck(myBoard, 'white');
//    logCheck(myBoard, 'black');
//    
//    myBoard.setupCheck(4);
//    console.log(myBoard.toString());
//    logCheck(myBoard, 'white');
//    logCheck(myBoard, 'black');
//    
//    myBoard.setupCheck(5);
//    console.log(myBoard.toString());
//    logCheck(myBoard, 'white');
//    logCheck(myBoard, 'black');
//    
//    myBoard.setupCheck(6);
//    console.log(myBoard.toString());
//    logCheck(myBoard, 'white');
//    logCheck(myBoard, 'black');
//    
//})();

function logCheck(board,set) {
    var checkResult = board.isCheck(set);
    console.log(checkResult.message);
}

//(function testCheck() {
//    var myBoard = new Board();
//    myBoard.setup();
//    
//    myBoard.isCheck();
//    
//    myBoard.setupCheckMate();
//    myBoard.isCheck();
//    myBoard.isCheckMate();
//    
//})();