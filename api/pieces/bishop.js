var Position = require('../position.js');
var Piece = require('./piece.js');

/* Bishop */
var Bishop = function(set) {
    Piece.call(this, set, 'bishop');
}
Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

Bishop.prototype.canMoveTo = function(origin, destination, board) {
    var destinations = this.getDestinations(origin, board);
    if(destinations[destination.toString()]) {
        return {success: true, message: 'Valid movement'};
    } else {
        return {success: false, message: 'Invalid movement'};
    }
}
Bishop.prototype.getDestinations = function(origin, board) {
    var coords = origin.getIntCoordinates();
    var destinations = {};
    
    var displacements = [
        {dCol: 1, dRow: 1},
        {dCol: 1, dRow: -1},
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

exports = module.exports = Bishop;