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
        return {success: true, message: 'Valid movement'};
    } else {
        return {success: false, message: 'Invalid movement'};
    }
}
Pawn.prototype.getDestinations = function(origin, board) {
    var coords = origin.getIntCoordinates();
    var destinations = {};
    
    var displacements = [
        {dCol: 0, dRow: 1},
        {dCol: 1, dRow: 1},
        {dCol: -1, dRow: 1}
    ];
    
    if(board.getStatus() === 'setup') displacements.push({dCol:0, dRow:2});
    
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