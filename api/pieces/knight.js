var Position = require('../position.js');
var Piece = require('./piece.js');

/* Knight */
var Knight = function(set) {
    Piece.call(this, set, 'knight');
}
Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

Knight.prototype.canMoveTo = function(origin, destination, board) {
    var destinations = this.getDestinations(origin, board);
    if(destinations[destination.toString()]) {
        return {success: true, message: 'Valid movement'};
    } else {
        return {success: false, message: 'Invalid movement'};
    }
}
Knight.prototype.getDestinations = function(origin, board) {
    var coords = origin.getIntCoordinates();
    var destinations = {};
    
    var displacements = [
        {dCol: 2, dRow: 1},
        {dCol: 2, dRow: -1},
        {dCol: 1, dRow: 2},
        {dCol: 1, dRow: -2},
        {dCol: -1, dRow: 2},
        {dCol: -1, dRow: -2},
        {dCol: -2, dRow: 1},
        {dCol: -2, dRow: -1},
    ];
    
    for(var d = 0, dLen = displacements.length; d < dLen; d++) {
        var disp = displacements[d];
        
        var col = coords.column + disp.dCol;
        var row = coords.row + disp.dRow;
        
        if(col <= 8 && col >=1 && row <= 8 && row >= 1) {
            var currentPosition = new Position(col, row);
            var piece = board.getPieceAt(currentPosition);
            if(piece === '') {
                destinations[currentPosition.toString()] = true;
            } else if (piece !== '' && piece.getSet() !== this.set) {
                destinations[currentPosition.toString()] = true;
            }
        }
    }
    return destinations;
}

exports = module.exports = Knight;