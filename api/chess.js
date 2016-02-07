var PIECES = require('./pieces.js');
var POS = require('./position.js');

var Board = function() {
    this.squares = {
        'a': {'1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': ''},
        'b': {'1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': ''},
        'c': {'1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': ''},
        'd': {'1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': ''},
        'e': {'1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': ''},
        'f': {'1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': ''},
        'g': {'1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': ''},
        'h': {'1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': ''}
    }
    this.kingPosition = {black: null, white: null};
}
Board.prototype.setup = function() {
    //set up white pieces
    this.squares['a']['1'] = new PIECES.Rook('white');
    this.squares['b']['1'] = new PIECES.Knight('white');
    this.squares['c']['1'] = new PIECES.Bishop('white');
    this.squares['d']['1'] = new PIECES.Queen('white');
    this.squares['e']['1'] = new PIECES.King('white');
    this.squares['f']['1'] = new PIECES.Bishop('white');
    this.squares['g']['1'] = new PIECES.Knight('white');
    this.squares['h']['1'] = new PIECES.Rook('white');
    for(var column in this.squares) {
        this.squares[column]['2'] = new PIECES.Pawn('white');
    }
    
    //set up black pieces
    this.squares['a']['8'] = new PIECES.Rook('black');
    this.squares['b']['8'] = new PIECES.Knight('black');
    this.squares['c']['8'] = new PIECES.Bishop('black');
    this.squares['d']['8'] = new PIECES.Queen('black');
    this.squares['e']['8'] = new PIECES.King('black');
    this.squares['f']['8'] = new PIECES.Bishop('black');
    this.squares['g']['8'] = new PIECES.Knight('black');
    this.squares['h']['8'] = new PIECES.Rook('black');
    for(var column in this.squares) {
        this.squares[column]['7'] = new PIECES.Pawn('black');
    }
    
    this.kingPosition = {
        black: new POS.Position('e',8),
        white: new POS.Position('e',1)
    }
}
Board.prototype.movePiece = function(origin, destination) {
    var piece = this.squares[origin.getColumn()][origin.getRow()];
    if(piece === '') {
        return { success: false, message: 'There was no piece in this position'};
    } else {
        var result = piece.moveTo(origin, destination, board);
        if(result.success) {
            //we move the piece
            var temp = this.squares[destination.getColumn()][destination.getRow()];
            this.squares[destination.getColumn()][destination.getRow()] = piece;
            
            if(Board.isCheck()) {
                
            }
            
            return result;
        } else {
            return result;
        }
    }
}
Board.isCheck = function(set) {
    
}
Board.isCheckMate = function() {
    
}

Game = function() {
    this.board = new CHESS.Board();
    this.status = ''
}
Game.prototype.getStatus = function() {
    return this.status;
}

module.exports = {
    Board: Board,
    Game: Game
}