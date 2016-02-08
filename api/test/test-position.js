var Position = require('../position.js');

(function testPosition() {
    console.log( "new Position(0,0) -->", (new Position(0,0)).toString() );
    console.log( "new Position(-1,0) -->", (new Position(-1,0)).toString() );
    console.log( "new Position('-1',0) -->", (new Position('-1',0)).toString() );
    console.log( "new Position(2,0) -->", (new Position(2,0)).toString() );
    console.log( "new Position('b',0) -->", (new Position('b',0)).toString() );
    console.log( "new Position(0,-1) -->", (new Position(0,-1)).toString() );
    console.log( "new Position(0,'-1') -->", (new Position(0,'-1')).toString() );
    console.log( "new Position(0,'a') -->", (new Position(0,'a')).toString() );
    console.log( "new Position(0,2) -->", (new Position(0,2)).toString() );
    console.log( "new Position('b',5) -->", (new Position('b',5)).toString() );
    console.log( "new Position(2,5) -->", (new Position(2,5)).toString() );
})();