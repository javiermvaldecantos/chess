var Position = require('./position.js');
var Board = require('./chess.js');

var Game = function(id) {
    this.board = new Board();
    this.id = id;
    this.currentPlayer = '';
    this.pieceCount = {
        black: 0,
        white:0
    }
}

Game.prototype.setup = function() {
    this.board.setup();
    this.pieceCount = {
        black: 16,
        white:16
    }
    this.currentPlayer = 'white';
    return {success: true, message: 'Game set up successfully. White player starts.'};
}

Game.prototype.move = function(player, oCol, oRow, dCol, dRow) {
    
    var originPiece = this.board.getPieceAt(new Position(oCol, oRow));
    
    if(this.currentPlayer !== player || this.currentPlayer !== originPiece.set) {
        return {success: false, message: "Invalid movement: It's " + this.currentPlayer + "'s player turn"}
    } else {
        var nextPlayer = (this.currentPlayer === "white") ? "black" : "white";
        var origin = new Position(oCol, oRow);
        var destination = new Position(dCol, dRow);
        
        if(origin.getIntColumn() <= 8 && origin.getRow() <= 8 && origin.getIntColumn() >= 1 && origin.getIntColumn() >= 1) {
            //Both positions are valid. Move the piece.
            var move = this.board.movePiece(origin, destination);
            if(move.success === true) {
                
                if(move.isCapture) this.pieceCount[nextPlayer]--;
                
                this.currentPlayer = nextPlayer;
                var isCheck = this.board.isCheck(nextPlayer);
                if(isCheck.result === true) {
                    return {success: true, isCheck: true, isCapture: move.isCapture, message: move.message};
                } else {
                    return {success: true, isCheck: false, isCapture: move.isCapture, message: move.message};
                }
                
            } else {
                return move;
            }
        
        } else {
            return {success: false, message:'Invalid movement: Some of the coordinates are not in the board'}
        }
    }
}

Game.prototype.getGameState = function() {
    var output = {
        boardAsJSON: this.board.squares,
        boardAsJSONString: JSON.stringify(this.board.squares),
        boardAsString: this.board.toString(),
        currentPlayer: this.currentPlayer,
        gameId: this.id,
        numberOfMoves: this.board.moveCount,
        numberOfPieces: this.pieceCount,
        boardStatus: this.board.getStatus()
    }
    return output;
}

Game.prototype.reset = function() {
    this.board.setup();
    this.pieceCount = {
        black: 16,
        white:16
    }
    this.currentPlayer = 'white';
    return {success: true, message: 'The game has been reset successfully'};
}

exports = module.exports = Game;