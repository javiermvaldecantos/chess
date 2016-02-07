var Position = require('./position.js');

/* import pieces */
var Rook = require('./pieces/rook.js');
var Pawn = require('./pieces/pawn.js');
var Knight = require('./pieces/knight.js');
var Bishop = require('./pieces/bishop.js');
var Queen = require('./pieces/queen.js');
var King = require('./pieces/king.js');

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
    this.status = '';
    this.kingPosition = {black: null, white: null};
}
Board.prototype.getStatus = function() {
    return this.status;
}
Board.prototype.getKingPosition = function() {
    return this.kingPosition;
}
Board.prototype.setup = function() {
    //set up white pieces
    this.squares['a']['1'] = new Rook('white');
    this.squares['b']['1'] = new Knight('white');
    this.squares['c']['1'] = new Bishop('white');
    this.squares['d']['1'] = new Queen('white');
    this.squares['e']['1'] = new King('white');
    this.squares['f']['1'] = new Bishop('white');
    this.squares['g']['1'] = new Knight('white');
    this.squares['h']['1'] = new Rook('white');
    for(var column in this.squares) {
        this.squares[column]['2'] = new Pawn('white');
    }
    
    //set up black pieces
    this.squares['a']['8'] = new Rook('black');
    this.squares['b']['8'] = new Knight('black');
    this.squares['c']['8'] = new Bishop('black');
    this.squares['d']['8'] = new Queen('black');
    this.squares['e']['8'] = new King('black');
    this.squares['f']['8'] = new Bishop('black');
    this.squares['g']['8'] = new Knight('black');
    this.squares['h']['8'] = new Rook('black');
    for(var column in this.squares) {
        this.squares[column]['7'] = new Pawn('black');
    }
    
    this.status = 'setup';
    
    this.kingPosition = {
        black: new Position('e',8),
        white: new Position('e',1)
    }
}
Board.prototype.getPieceAt = function(position) {
    var coords = position.getCoordinates();
    var piece = this.squares[coords.column][coords.row];
    return piece || '';
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
    this.board = new Board();
    this.playerBlack;
    this.playerWhite;
}
Game.prototype.getStatus = function() {
    return this.status;
}

exports = module.exports = {
    Board: Board,
    Game: Game
}