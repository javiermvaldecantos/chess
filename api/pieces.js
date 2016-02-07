var POS = require('./position.js')
var CHESS = require('./chess.js');

/* Piece */
var Piece = function(set, name) {
    this.set = set; // 'black' or 'white'
    this.name = name;
}

/* Pawn */
var Pawn = function(set) {
    Piece.call(this, set, 'pawn');
}
Pawn.prototype.canMove = function(origin, destination, board) {
    //origin and destinations must be Positions
//    if(!(origin instanceof POS.Position) || !(destination instanceof POS.Position)) return false;
//    
//    var oCoords = origin.getIntCoordinates();
//    var dCoords = destination.getIntCoordinates();
//    
//    if(oCoords.column === dCoords.column) {
//        if(oCoords.row)
//    } else {
//        
//    }
}

/* Rook */
var Rook = function(set) {
    Piece.call(this, set, 'rook');
}
Rook.prototype.canMoveTo = function(origin, destination, board) {
    var destinations = this.getDestinations(origin);
    if(destinations[destination.toString()]) {
        return {success: true, message: 'Valid movement'};
    } else {
        return {success: false, message: 'Invalid movement'};
    }
}
Rook.prototype.getDestinations = function(origin) {
    var coords = origin.getIntCoordinates();
    var destinations = {};
    for(var i = 1; i <= 8; i++) {
        var tempPosition = new POS.Position(coords.column, i);
        if(i !== coords.row) destinations[tempPosition.toString()] = true;
        
        var tempPosition = new POS.Position(i, coords.row);
        if(i !== coords.column) destinations[tempPosition.toString()] = true;
    }
    return destinations;
}

/* Bishop */
var Bishop = function(set) {
    Piece.call(this, set, 'bishop');
}

/* Knight */
var Knight = function(set) {
    Piece.call(this, set, 'knight');
}

/* Queen */
var Queen = function(set) {
    Piece.call(this, set, 'queen');
}

/* King */
var King = function(set) {
    Piece.call(this, set, 'king');
}

module.exports = {
    Piece: Piece,
    Pawn: Pawn,
    Rook: Rook,
    Bishop: Bishop,
    Knight: Knight,
    Queen: Queen,
    King: King
}