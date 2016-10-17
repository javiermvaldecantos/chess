# chess
This project provides a web service capable of facilitating a chess game

##APIs
<!---
    All apis have the same endpoint: `http://chess-jmorenov.rhcloud.com/api/`
    
    After I removed the chess application from the hosting site, this doesn't work any more. Therefore  I'll remove it until I redeploy it in the future.
    
    Links to APIs:
    1. [http://chess-jmorenov.rhcloud.com/api/startgame](http://chess-jmorenov.rhcloud.com/api/startgame)
    2. [http://chess-jmorenov.rhcloud.com/api/gamestate?id=XXXX](http://chess-jmorenov.rhcloud.com/api/gamestate?id=XXXX)
    3. [http://chess-jmorenov.rhcloud.com/api/boardsketch?id=XXXX](http://chess-jmorenov.rhcloud.com/api/boardsketch?id=XXXX)
    4. [http://chess-jmorenov.rhcloud.com/api/resetgame?id=XXXX](http://chess-jmorenov.rhcloud.com/api/resetgame?id=XXXX)
    5. [http://chess-jmorenov.rhcloud.com/api/stopgame?id=XXXX](http://chess-jmorenov.rhcloud.com/api/stopgame?id=XXXX)
    6. [http://chess-jmorenov.rhcloud.com/api/movepiece?id=XXXX&player=white&oCol=b&oRow=2&dCol=b&dRow=3](http://chess-jmorenov.rhcloud.com/api/movepiece?id=XXXX&oCol=b&oRow=2&dCol=b&dRow=3)
    7. [http://chess-jmorenov.rhcloud.com/api/movepiece?id=XXXX](http://chess-jmorenov.rhcloud.com/api/movepiece?id=XXXX)
-->

There's a total of 6 APIs:
 1. __startgame:__ GET /api/startgame
    Sets up the game and returns a message informing whether the setup was successful or not. It also returns the game ID wich will be used to call the rest of APIs.

 2. __gamestate:__ GET /api/gamestate?id=XXXX
    Returns the game state as a JSON object with different parameters (number of pieces on the board, number of moves, the board as a JSON object, etc.)

 3. __boardsketch:__ GET /api/boardsketch?id=XXXX
    Returns a sketch of the board in plain text, so that the developer can quickly see what's the state of the game.

 4. __resetgame:__ GET /api/resetgame?id=XXXX
    Resets the game with ID=XXXX. This means the game will go back to "setup" status, and the players will be able to start playing again.

 5. __stopgame:__ GET /api/stopgame?id=XXXX
    Stops the game with ID=XXXX. This means that the game with ID=XXXX will be deleted from the server's database and will no longer exist.

 6. __movepiece:__ GET /api/movepiece?id=XXXX&player=white&oCol=b&oRow=2&dCol=b&dRow=3
    Tries to move a piece of the set given by the "player" parameter (i.e. 'black' or 'white') from the position (oCol,oRow) to the position (dCol, dRow). Will return a JSON object confirming if the movement was successful or not, if there's a check after the movement and if the piece that was moved captured another piece. The layout of the board is the following ([a-h] columns, [1-8] rows):
    ```
       ___a___|___b___|___c___|___d___|___e___|___f___|___g___|___h___   
    8 |* rook |*knight|*bishop|*queen |* king |*bishop|*knight|* rook | 8
    7 |* pawn |* pawn |* pawn |* pawn |* pawn |* pawn |* pawn |* pawn | 7
    6 |_______|_______|_______|_______|_______|_______|_______|_______| 6
    5 |_______|_______|_______|_______|_______|_______|_______|_______| 5
    4 |_______|_______|_______|_______|_______|_______|_______|_______| 4
    3 |_______|_______|_______|_______|_______|_______|_______|_______| 3
    2 |+ pawn |+ pawn |+ pawn |+ pawn |+ pawn |+ pawn |+ pawn |+ pawn | 2
    1 |+ rook |+knight|+bishop|+queen |+ king |+bishop|+knight|+ rook | 1
       ___a___|___b___|___c___|___d___|___e___|___f___|___g___|___h___   
    
       + = white piece   
       * = black piece   
    ```
 7. __movepiece:__ POST /api/movepiece?id=XXXX
    This API is equivalent to API number 6, but it is a POST request. The body of the request must be:
    
    ```javascript
    {
        "player":"white",
        "oCol":"b",
        "oRow":"2",
        "dCol":"b",
        "dRow":4
    }
    ```