var PIECES = require('../pieces.js');
var POS = require('../position.js')

function equals(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/* test rook movement */
(function test1() {
    var rook1 = new PIECES.Rook('white');
    var mypos = new POS.Position(2,7);
    var dest = rook1.getDestinations(mypos);
    console.log('destinations',dest);
    var expected = { b1: true,
                     a7: true,
                     b2: true,
                     b3: true,
                     c7: true,
                     b4: true,
                     d7: true,
                     b5: true,
                     e7: true,
                     b6: true,
                     f7: true,
                     g7: true,
                     b8: true,
                     h7: true 
                   }
    if(equals(dest,expected)) {
        console.log('rook movement predicted successfully');
    } else {
        console.log('rook movement prediction failed');
    }

    var posdest = new POS.Position(2,1);
    console.log('(2,7) --> (2,7)', rook1.canMoveTo(mypos,mypos));
    console.log('(2,7) --> (2,1)', rook1.canMoveTo(mypos,posdest));
    console.log('(2,7) --> (4,1)', rook1.canMoveTo(mypos,new POS.Position(4,1)));
})()