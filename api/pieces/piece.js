/* Piece */
var Piece = function(set, name) {
    this.set = set.toLowerCase(); // 'black' or 'white'
    this.name = name.toLowerCase(); // 'pawn', 'rook', 'knight', 'bishop', 'queen', 'king'
}
Piece.prototype.getSet = function() {
    return this.set;
}

module.exports = Piece;