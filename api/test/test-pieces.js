var Position = require('../position.js');
var CHESS = require('../chess.js');

function equals(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

(function testRook() {
    var myBoard = new CHESS.Board();
    myBoard.setup();
    var rook1 = myBoard.getPieceAt(new Position('a',1));
    var destinations = rook1.getDestinations(new Position('a',1), myBoard);
    console.log('Rook Destinations at chess start:',destinations);
    console.log('rook1.canMoveTo(new Position(\'a\',1),new Position(\'a\',7),myBoard)');
    console.log(rook1.canMoveTo(new Position(1,1),new Position(1,7),myBoard));
    
    console.log('Rook Destinations from (a,3):',rook1.getDestinations(new Position('a',3), myBoard));
    console.log('rook1.canMoveTo(new Position(\'a\',3),new Position(\'a\',7),myBoard)');
    console.log(rook1.canMoveTo(new Position('a',3),new Position('a',7),myBoard));
})();

(function testBishop() {
    var myBoard = new CHESS.Board();
    myBoard.setup();
    var bishop1 = myBoard.getPieceAt(new Position('c',1));
    var destinations = bishop1.getDestinations(new Position('c',1), myBoard);
    console.log('Bishop Destinations at chess start:',destinations);
    console.log('bishop1.canMoveTo(new Position(\'c\',1),new Position(\'e\',3),myBoard)');
    console.log(bishop1.canMoveTo(new Position('c',1),new Position('e',3),myBoard));
    
    console.log('Bishop Destinations from (a,3):',bishop1.getDestinations(new Position('a',3), myBoard));
    console.log('bishop1.canMoveTo(new Position(\'a\',3),new Position(\'d\',6),myBoard)');
    console.log(bishop1.canMoveTo(new Position(1,3),new Position('d',6),myBoard));
    
    console.log('Bishop Destinations from (d,4):',bishop1.getDestinations(new Position('d',4), myBoard));
    
})();

(function testQueen() {
    var myBoard = new CHESS.Board();
    myBoard.setup();
    var queen1 = myBoard.getPieceAt(new Position('d',8));
    var destinations = queen1.getDestinations(new Position('d',8), myBoard);
    console.log('Queen Destinations at chess start:',destinations);
    /*
    expected: {}
    */
    console.log('bishop1.canMoveTo(new Position(\'d\',8),new Position(\'f\',6),myBoard)');
    console.log(queen1.canMoveTo(new Position('d',8),new Position('f',6),myBoard));
    
    console.log('Queen Destinations from (a,3):',queen1.getDestinations(new Position('a',3), myBoard));
    /*
    expected: {b3: true,c3: true,d3: true,e3: true,f3: true,g3: true,h3: true,b4: true,c5: true,d6: true,b2: true,a4: true,a5: true,a6: true,a2: true}

    */
    console.log('queen1.canMoveTo(new Position(\'a\',3),new Position(\'b\',2),myBoard)');
    console.log(queen1.canMoveTo(new Position('a',3),new Position('b',2),myBoard));
    
    console.log('Queen Destinations from (d,4):',queen1.getDestinations(new Position('d',4), myBoard));
    /*
    expected:{e4: true,f4: true,g4: true,h4: true,e5: true,f6: true,e3: true,f2: true,d5: true,d6: true,d3: true,d2: true,c4: true,b4: true,a4: true,c5: true,b6: true,c3: true,b2: true}
    */
})();

(function testKnight() {
    var myBoard = new CHESS.Board();
    myBoard.setup();
    var knight1 = myBoard.getPieceAt(new Position('b',1));
    var destinations = knight1.getDestinations(new Position('b',1), myBoard);
    console.log('Knight Destinations at chess start:',destinations);
    /*
    expected: { c3: true, a3: true }
    */
    console.log('knight1.canMoveTo(new Position(\'b\',1),new Position(\'c\',3),myBoard)');
    console.log(knight1.canMoveTo(new Position('b',1),new Position('c',3),myBoard));
    console.log('knight1.canMoveTo(new Position(\'b\',1),new Position(\'b\',3),myBoard)');
    console.log(knight1.canMoveTo(new Position('b',1),new Position('b',3),myBoard));
    
    console.log('Knight Destinations from (e,5):',knight1.getDestinations(new Position('e',5), myBoard));
    /*
    expected: { g6: true,g4: true,f7: true,f3: true,d7: true,d3: true,c6: true,c4: true }
    */
    console.log('knight1.canMoveTo(new Position(\'e\',5),new Position(\'f\',7),myBoard)');
    console.log(knight1.canMoveTo(new Position('e',5),new Position('f',7),myBoard));
    console.log('knight1.canMoveTo(new Position(\'e\',5),new Position(\'e\',3),myBoard)');
    console.log(knight1.canMoveTo(new Position('e',5),new Position('e',3),myBoard));
})();

(function testKing() {
    var myBoard = new CHESS.Board();
    myBoard.setup();
    var whiteK = myBoard.getPieceAt(new Position('e',1));
    var blackK = myBoard.getPieceAt(new Position('e',8));
    var destinations = whiteK.getDestinations(new Position('b',1), myBoard);
    console.log('King Destinations at chess start:',destinations);
    console.log('whiteK.canMoveTo(new Position(\'b\',1),new Position(\'c\',3),myBoard)');
    console.log(whiteK.canMoveTo(new Position('b',1),new Position('c',3),myBoard));
    console.log('whiteK.canMoveTo(new Position(\'b\',1),new Position(\'b\',3),myBoard)');
    console.log(whiteK.canMoveTo(new Position('b',1),new Position('b',3),myBoard));
    
    console.log('White King Destinations from (e,6):',whiteK.getDestinations(new Position('e',6), myBoard));
    /*
    expected: { f6: true,f7: true,f5: true,e7: true,e5: true,d6: true,d7: true,d5: true }
    */
    console.log('whiteK.canMoveTo(new Position(\'e\',6),new Position(\'f\',7),myBoard)');
    console.log(whiteK.canMoveTo(new Position('e',6),new Position('f',7),myBoard));
    console.log('whiteK.canMoveTo(new Position(\'e\',6),new Position(\'e\',3),myBoard)');
    console.log(whiteK.canMoveTo(new Position('e',6),new Position('e',3),myBoard));
    
    console.log('Black King Destinations from (e,6):',blackK.getDestinations(new Position('e',6), myBoard));
    /*
    expected: { f6: true, f5: true, e5: true, d6: true, d5: true }
    */
    console.log('blackK.canMoveTo(new Position(\'e\',6),new Position(\'f\',7),myBoard)');
    console.log(blackK.canMoveTo(new Position('e',6),new Position('f',7),myBoard));
    console.log('blackK.canMoveTo(new Position(\'e\',6),new Position(\'e\',3),myBoard)');
    console.log(blackK.canMoveTo(new Position('e',6),new Position('e',3),myBoard));
})();

(function testPawn() {
    var myBoard = new CHESS.Board();
    myBoard.setup();
    var pawn1 = myBoard.getPieceAt(new Position('b',2));
    var destinations = pawn1.getDestinations(new Position('b',2), myBoard);
    console.log('Pawn Destinations at chess start:',destinations);
    /*
    expected: { b3: true, b4: true }
    */
    console.log('pawn1.canMoveTo(new Position(\'b\',2),new Position(\'b\',3),myBoard)');
    console.log(pawn1.canMoveTo(new Position('b',2),new Position('b',3),myBoard));
    console.log('pawn1.canMoveTo(new Position(\'b\',2),new Position(\'b\',4),myBoard)');
    console.log(pawn1.canMoveTo(new Position('b',2),new Position('b',3),myBoard));
    console.log('pawn1.canMoveTo(new Position(\'b\',2),new Position(\'f\',3),myBoard)');
    console.log(pawn1.canMoveTo(new Position('b',2),new Position('f',3),myBoard));
    
    myBoard.status = 'playing';
    
    console.log('Pawn Destinations from (e,6):',pawn1.getDestinations(new Position('e',6), myBoard));
    /*
    expected: {d7: true, f7: true}
    */
    console.log('pawn1.canMoveTo(new Position(\'e\',6),new Position(\'e\',7),myBoard)');
    console.log(pawn1.canMoveTo(new Position('e',6),new Position('e',7),myBoard));
    console.log('pawn1.canMoveTo(new Position(\'e\',6),new Position(\'f\',7),myBoard)');
    console.log(pawn1.canMoveTo(new Position('e',6),new Position('f',7),myBoard));
})();