var Position = require('../position.js');
var Piece = require('./piece.js');

/* Pawn */
var Pawn = function(set) {
    Piece.call(this, set, 'pawn');
}
Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.canMoveTo = function(origin, destination, board) {
    var destinations = this.getDestinations(origin, board);
    if(destinations[destination.toString()]) {
        return {
            success: true,
            message: 'Valid movement: ' + this.set + ' ' + this.name + ' from ' + origin.toString() + ' to ' + destination.toString()
        };
    } else {
        return {
            success: false,
            message: 'Invalid movement: ' + this.set + ' ' + this.name + ' from ' + origin.toString() + ' to ' + destination.toString()
        };
    }
}
Pawn.prototype.getDestinations = function(origin, board) {
    var coords = origin.getIntCoordinates();
    var destinations = {};
    
    var vector1 = (this.set === 'white') ? 1 : -1 ;
    var displacements = [
        {dCol: 0, dRow: vector1},
        {dCol: 1, dRow: vector1},
        {dCol: -1, dRow: vector1}
    ];
    
    if(board.getStatus() === 'setup' || board.getStatus() === 'started') {
        var vector2 = vector1 * 2;
        displacements.push({dCol:0, dRow:vector2});
    };
    
    for(var d = 0, dLen = displacements.length; d < dLen; d++) {
        var disp = displacements[d];
        
        var col = coords.column + disp.dCol;
        var row = coords.row + disp.dRow;
        
        if(col <= 8 && col >=1 && row <= 8 && row >= 1) {
            var currentPosition = new Position(col, row);
            var piece = board.getPieceAt(currentPosition);
            if(piece === '' && disp.dCol === 0) {
                destinations[currentPosition.toString()] = true;
            } else if (piece !== '' && piece.getSet() !== this.set && disp.dCol !== 0) {
                destinations[currentPosition.toString()] = true;
            }
        }
    }
    return destinations;
}

exports = module.exports = Pawn;