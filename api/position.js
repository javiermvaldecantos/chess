// one position can be created specifying the column as a letter (a-h) or as a number
var Position = function(column,row) {
    
    if(typeof column === "string") {
        var columnAsInt = column.toLowerCase().charCodeAt(0) - 96;
        if(columnAsInt === NaN || columnAsInt < 1 || columnAsInt > 8) {
            columnAsInt = 1;    //default column
        }
        this.column = (column.match(/^[a-h]$/)) ? column : "a";
        this.columnAsInt = columnAsInt;
    } else if (typeof column === "number") {
        this.columnAsInt = (tempRow === NaN || tempRow < 1 || tempRow > 8) ? 1 : column;
        this.column = String.fromCharCode(this.columnAsInt + 96);
    } else {
        this.columnAsInt = 1;
        this.column = 'a';
    }
    
    var tempRow = parseInt(row);
    if(tempRow === NaN || tempRow < 1 || tempRow > 8) {
        tempRow = 1;    //default row
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

module.exports.Position = Position;