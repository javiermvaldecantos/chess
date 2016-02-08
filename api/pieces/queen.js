var Position = require('../position.js');
var Piece = require('./piece.js');

/* Queen */
var Queen = function(set) {
    Piece.call(this, set, 'queen');
}
Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

Queen.prototype.canMoveTo = function(origin, destination, board) {
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
Queen.prototype.getDestinations = function(origin, board) {
    var coords = origin.getIntCoordinates();
    var destinations = {};
    
    var displacements = [
        {dCol: 1, dRow: 0},
        {dCol: 1, dRow: 1},
        {dCol: 1, dRow: -1},
        {dCol: 0, dRow: 1},
        {dCol: 0, dRow: -1},
        {dCol: -1, dRow: 0},
        {dCol: -1, dRow: 1},
        {dCol: -1, dRow: -1},
    ];
    
    for(var d = 0, dLen = displacements.length; d < dLen; d++) {
        var disp = displacements[d];
        
        for(var col = coords.column + disp.dCol, row = coords.row + disp.dRow;
            col <= 8 && col >=1 && row <= 8 && row >= 1;
            col += disp.dCol, row += disp.dRow) {
            
            var currentPosition = new Position(col, row);
            var piece = board.getPieceAt(currentPosition);
            if(piece === '') {
                destinations[currentPosition.toString()] = true;
            } else {
                if(piece !== '' && piece.getSet() !== this.set) destinations[currentPosition.toString()] = true;
                break;
            }
        }
        
    }
    return destinations;
}

exports = module.exports = Queen;