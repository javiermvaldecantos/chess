// one position can be created specifying the column as a letter (a-h) or as a number
var Position = function(column,row) {
    
    if(typeof column === "string") {
        var columnAsInt = column.toLowerCase().charCodeAt(0) - 96;
        if(isNaN(columnAsInt) || columnAsInt < 1 || columnAsInt > 8) {
            columnAsInt = 0;    //default column is 0 (out of the board)
        }
        this.column = (column.match(/^[a-h]$/)) ? column : "0";
        this.columnAsInt = columnAsInt;
    } else if (typeof column === "number") {
        this.columnAsInt = (isNaN(column) || column < 1 || column > 8) ? 0 : column;
        this.column = (this.columnAsInt === 0) ? "0" : String.fromCharCode(this.columnAsInt + 96);
    } else {
        this.columnAsInt = 1;
        this.column = 'a';
    }
    
    var tempRow = parseInt(row);
    if(isNaN(tempRow) || tempRow < 1 || tempRow > 8) {
        tempRow = 0;    //default row
    }
    this.row = tempRow;
}
Position.prototype.getCoordinates = function() {
    return {column: this.column, row: this.row};
}
Position.prototype.getIntCoordinates = function() {
    return {column: this.columnAsInt, row: this.row};
}
Position.prototype.getColumn = function() {
    return this.column;
}
Position.prototype.getIntColumn = function() {
    return this.columnAsInt;
}
Position.prototype.getRow = function() {
    return this.row;
}
Position.prototype.toString = function() {
    return this.column + "" + this.row;
}

module.exports = Position;