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
    this.check = '';
    this.kingPosition = {black: null, white: null};
    this.moveCount = 0;
}
Board.prototype.getStatus = function() {
    return this.status;
}
Board.prototype.getKingPosition = function(set) {
    if(set !== 'white' && set !== 'black') {
        return null;
    } else {
        return this.kingPosition[set];
    }
}
Board.prototype.toString = function() {
    var s = "\n";
    
    s += '   __a___|__b___|__c___|__d___|__e___|__f___|__g___|__h___   \n';
    
    for(var keyRow in this.squares['a']) {
        s += keyRow + ' |'
        for(var keyCol in this.squares) {
            var oppositeRow = 9 - keyRow;
            var piece = this.getPieceAt(new Position(keyCol, oppositeRow));
            
            if(piece === '') {
                s += '______|';
            } else {
                s += normalizeName(piece.name) + '|'
            }
        }
        s += ' ' + keyRow + '\n';
    }
    
    s += '   __a___|__b___|__c___|__d___|__e___|__f___|__g___|__h___   \n';
    
    return s;
}

function normalizeName(name) {
    if(name.length <= 4) {
        return ' ' + name + ' ';
    } else if (name.length === 5) {
        return name + ' ';
    } else if (name.length >= 6) {
        return name;
    }
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
    
    var oPiece = this.getPieceAt(origin);
    
    if(oPiece === '') {
        return { success: false, message: 'There was no piece in this position'};
    } else {
        var result = oPiece.canMoveTo(origin, destination, this);
        result.isCapture = false;
        if(result.success) {
            //we move the piece
            var dPiece = this.getPieceAt(destination);
            
            if(oPiece.name === 'king') {
                // we move the king and check if it's in check after moving
                this.squares[destination.getColumn()][destination.getRow()] = oPiece;
                this.squares[origin.getColumn()][origin.getRow()] = '';
                // Update King's position
                this.kingPosition[oPiece.set] = destination;
                
                var isCheck = this.isCheck(oPiece.set);
                
                if(isCheck.result) {    //if it's check we'll move back the piece to its original position
                    result.success = false;
                    result.message = "Invalid movement: the " + oPiece.set + " king would be in check";
                    this.squares[destination.getColumn()][destination.getRow()] = dPiece;
                    this.squares[origin.getColumn()][origin.getRow()] = oPiece;
                    // put king on the original position
                    this.kingPosition[oPiece.set] = origin;
                    
                } else {
                    result.isCapture = dPiece !== '';   //the piece in origin has captured the piece in the destination
                    this.moveCount++;
                    if(this.moveCount >= 2) this.status = 'playing';
                }
                
            } else {
                result.isCapture = dPiece !== '';   //the piece in origin has captured the piece in the destination
                this.squares[destination.getColumn()][destination.getRow()] = oPiece;
                this.squares[origin.getColumn()][origin.getRow()] = '';
                
                var nowIsCheck = this.isCheck(oPiece.set);
                if(nowIsCheck.result) {
                    //we have moved and we're in check. The movement is invalid
                    result.success = false;
                    result.message = "Invalid movement: the " + oPiece.set + " king would be in check";
                    this.squares[destination.getColumn()][destination.getRow()] = dPiece;
                    this.squares[origin.getColumn()][origin.getRow()] = oPiece;
                } else {
                    var complementarySet = (oPiece.set === 'white') ? 'black' : 'white';
                    var nextIsCheck = this.isCheck(complementarySet);

                    if(nextIsCheck.result) {
                        this.check = complementarySet;
                        this.status = complementarySet + ' check'
                    }
                    
                    this.moveCount++;
                    if(this.moveCount >= 2) this.status = 'playing';
                } 
            }
            
            return result;
            
        } else {
            return result;
        }
    }
}
Board.prototype.isCheck = function(set) {
    if (set !== 'white' || set !== 'black') {
        var kingPosition = this.getKingPosition(set);
        
        var output = {
            result: false,
            message: 'The ' + set + ' king is not in check'
        }
        
        var queenThreat = this.isQueenThreat(kingPosition,set);
        if(queenThreat.isThreat) {
            output.result = true;
            output.message = 'The ' + set + ' king is in check due to queen on ' + queenThreat.position;
        }
        var knightThreat = this.isKnightThreat(kingPosition,set);
        if(knightThreat.isThreat) {
            output.result = true;
            output.message = 'The ' + set + ' king is in check due to knight on ' + knightThreat.position;
        }
        var rookThreat = this.isRookThreat(kingPosition,set);
        if(rookThreat.isThreat) {
            output.result = true;
            output.message = 'The ' + set + ' king is in check due to rook on ' + rookThreat.position;
        }
        var bishopThreat = this.isBishopThreat(kingPosition,set);
        if(bishopThreat.isThreat) {
            output.result = true;
            output.message = 'The ' + set + ' king is in check due to bishop on ' + bishopThreat.position;
        }
        var pawnThreat = this.isPawnThreat(kingPosition,set);
        if(pawnThreat.isThreat) {
            output.result = true;
            output.message = 'The ' + set + ' king is in check due to pawn on ' + pawnThreat.position;
        }
        var kingThreat = this.isKingThreat(kingPosition,set);
        if(kingThreat.isThreat) {
            output.result = true;
            output.message = 'The ' + set + ' king is in check due to king on ' + kingThreat.position;
        }
        
        return output;
    }
}

Board.prototype.isPawnThreat = function(kingPosition, kingSet) {
    var oppositeSet = (kingSet === 'white') ? 'black' : 'white';
    var vector = (kingSet === 'white') ? 1 : -1;
    var destinations = [
        {col: kingPosition.getIntColumn() + 1, row: kingPosition.getRow() + vector},
        {col: kingPosition.getIntColumn() - 1, row: kingPosition.getRow() + vector}
    ];
    
    for(var i = 0; i < 2; i++) {
        var pawnPosition = new Position(destinations[i].col, destinations[i].row);
        var piece = this.getPieceAt(pawnPosition);
        if(piece !== '' && piece.name === 'pawn' && piece.set === oppositeSet) {
            return {isThreat: true, position: pawnPosition.toString()};
        }
    }
    return {isThreat: false, position: ''};
}

Board.prototype.isRookThreat = function(kingPosition, kingSet) {
    var tempRook = new Rook(kingSet);
    var destinations = tempRook.getDestinations(kingPosition, this);
    for(var dest in destinations) {
        var col = dest[0];
        var row = dest[1];
        var rookPosition = new Position(col, row);
        var piece = this.getPieceAt(rookPosition);
        if(piece !== '' && piece.name === 'rook') {
            return {isThreat: true, position: rookPosition.toString()};
        }
    }
    return {isThreat: false, position: ''};
}

Board.prototype.isKnightThreat = function(kingPosition, kingSet) {
    var tempKnight = new Knight(kingSet);
    var destinations = tempKnight.getDestinations(kingPosition, this);
    for(var dest in destinations) {
        var col = dest[0];
        var row = dest[1];
        knightPosition = new Position(col, row);
        var piece = this.getPieceAt(knightPosition);
        if(piece !== '' && piece.name === 'knight') {
            return {isThreat: true, position: knightPosition.toString()};
        }
    }
    return {isThreat: false, position: ''};
}

Board.prototype.isBishopThreat = function(kingPosition, kingSet) {
    var tempBishop = new Bishop(kingSet);
    var destinations = tempBishop.getDestinations(kingPosition, this);
    for(var dest in destinations) {
        var col = dest[0];
        var row = dest[1];
        var bishopPosition = new Position(col, row);
        var piece = this.getPieceAt(bishopPosition);
        if(piece !== '' && piece.name === 'bishop') {
            return {isThreat: true, position: bishopPosition.toString()};
        }
    }
    return {isThreat: false, position: ''};
}

Board.prototype.isQueenThreat = function(kingPosition, kingSet) {
    var tempQueen = new Queen(kingSet);
    var destinations = tempQueen.getDestinations(kingPosition, this);
    for(var dest in destinations) {
        var col = dest[0];
        var row = dest[1];
        var queenPosition = new Position(col, row)
        var piece = this.getPieceAt(queenPosition);
        if(piece !== '' && piece.name === 'queen') {
            return {isThreat: true, position: queenPosition.toString()};
        }
    }
    return {isThreat: false, position: ''};
}
Board.prototype.isKingThreat = function(kingPosition, kingSet) {
    var tempKing = new King(kingSet);
    var destinations = tempKing.getDestinations(kingPosition, this);
    for(var dest in destinations) {
        var col = dest[0];
        var row = dest[1];
        var kingPosition = new Position(col, row)
        var piece = this.getPieceAt(kingPosition);
        if(piece !== '' && piece.name === 'king') {
            return {isThreat: true, position: kingPosition.toString()};
        }
    }
    return {isThreat: false, position: ''};
}

//test cases for testing check
Board.prototype.setupCheck = function(testCase) {
    for(var keyCol in this.squares) {
        for(var keyRow in this.squares[keyCol]) {
            this.squares[keyCol][keyRow] = '';
        }
    }
    
    switch(testCase) {
        case 1:
            this.squares['d'][6] = new King('black');
            this.squares['f'][6] = new Bishop('black');
            this.squares['h'][5] = new Knight('black');
            this.squares['g'][3] = new Bishop('white');
            this.squares['f'][3] = new King('white');
            this.kingPosition = {
                black: new Position('d',6),
                white: new Position('f',3)
            }
            break;
        case 2:
            this.squares['d'][6] = new King('black');
            this.squares['f'][3] = new King('white');
            this.squares['d'][1] = new Rook('white');
            this.kingPosition = {
                black: new Position('d',6),
                white: new Position('f',3)
            }
            break;
        case 3:
            this.squares['d'][6] = new King('black');
            this.squares['f'][3] = new King('white');
            this.squares['c'][6] = new Bishop('black');
            this.kingPosition = {
                black: new Position('d',6),
                white: new Position('f',3)
            }
            break;
        case 4:
            this.squares['d'][6] = new King('black');
            this.squares['f'][3] = new King('white');
            this.squares['c'][6] = new Queen('black');
            this.kingPosition = {
                black: new Position('d',6),
                white: new Position('f',3)
            }
            break;
        case 5:
            this.squares['d'][6] = new King('black');
            this.squares['f'][3] = new King('white');
            this.squares['c'][4] = new Knight('white');
            this.kingPosition = {
                black: new Position('d',6),
                white: new Position('f',3)
            }
            break;
        case 6:
            this.squares['d'][6] = new King('black');
            this.squares['d'][5] = new King('white');
            this.kingPosition = {
                black: new Position('d',6),
                white: new Position('d',5)
            }
            break;
    }
}

Board.prototype.isCheckMate = function() {
    //to develop
}

exports = module.exports = Board;