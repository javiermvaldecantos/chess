/* Piece */
var Piece = function(set, name) {
    this.set = set; // 'black' or 'white'
    this.name = name;
}
Piece.prototype.getSet = function() {
    return this.set;
}

module.exports = Piece;