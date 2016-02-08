#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var http    = require('http');

/* Chess game */
var Game = require('./api/game.js');

var app = express();

var http = require('http');

var ALL_GAMES = {};
var LAST_ID = 1000; //id of last game

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

app.use(express.bodyParser());

app.get('*',function(request,response) {
    if(request.url.substr(0,5) === '/api/') {
        console.log('Chess API was called');
        
        var requestPath = request.url.substr(5);
        var requestQuery = request.query;
        
        if(requestPath.indexOf('?') !== -1) {
            var questionIndex = requestPath.indexOf('?');
            requestPath = requestPath.substr(0,questionIndex);
        }
        
        requestPath = requestPath.toLowerCase();
            
        switch(requestPath) {
            case "startgame":
                var newGameID = ++LAST_ID;
                var theGame = new Game(newGameID);
                var gameSetup = theGame.setup();
                gameSetup.gameId = newGameID;
                
                ALL_GAMES['' + newGameID] = theGame;
                response.send(gameSetup);
                break;
            
            case "movepiece":   // equivalent to 'POST' /movepiece, but with the parameters inside the URI
                
                if(requestQuery) {
                    var gameID = requestQuery.id;
                    if(gameID) {
                        
                        var selectedGame = ALL_GAMES[gameID];
                        
                        if(!selectedGame) {
                            response.writeHead(400, {"Content-Type": "text/plain"});
                            response.write('404 NOT FOUND - There is no game with ID='+gameID);
                            response.end();
                        } else {
                            
                            var player = requestQuery.player;
                            var oCol = requestQuery.oCol;
                            var oRow = requestQuery.oRow;
                            var dCol = requestQuery.dCol;
                            var dRow = requestQuery.dRow;
                            
                            var moveResult = selectedGame.move(player, oCol, oRow, dCol, dRow);
                            
                            response.send(moveResult);
                        }
                        
                    } else {
                        response.writeHead(400, {"Content-Type": "text/plain"});
                        response.write('400 BAD REQUEST - No game ID was specified');
                        response.end();
                    }
                } else {
                    response.writeHead(400, {"Content-Type": "text/plain"});
                    response.write('400 BAD REQUEST - No game ID was specified');
                    response.end();
                }
                break;
            
            case "gamestate":
                
                if(requestQuery) {
                    var gameID = requestQuery.id;
                    if(gameID) {
                        
                        var selectedGame = ALL_GAMES[gameID];
                        
                        if(!selectedGame) {
                            response.writeHead(400, {"Content-Type": "text/plain"});
                            response.write('404 NOT FOUND - There is no game with ID='+gameID);
                            response.end();
                        } else {
                            var gameState = selectedGame.getGameState();
                            
                            response.send({success:true, data:gameState});
                        }
                        
                    } else {
                        response.writeHead(400, {"Content-Type": "text/plain"});
                        response.write('400 BAD REQUEST - No game ID was specified');
                        response.end();
                    }
                } else {
                    response.writeHead(400, {"Content-Type": "text/plain"});
                    response.write('400 BAD REQUEST - No game ID was specified');
                    response.end();
                }
                break;
                
            case "boardsketch":
                if(requestQuery) {
                    var gameID = requestQuery.id;
                    if(gameID) {
                        var selectedGame = ALL_GAMES[gameID];
                        
                        if(!selectedGame) {
                            response.writeHead(400, {"Content-Type": "text/plain"});
                            response.write('404 NOT FOUND - There is no game with ID='+gameID);
                            response.end();
                        } else {
                            var gameState = selectedGame.getGameState();
                            var boardSketch = gameState.boardAsString;
                            
                            response.writeHead(200, {"Content-Type": "text/plain"});
                            response.write(boardSketch);
                            response.end();
                        }
                        
                    } else {
                        response.writeHead(400, {"Content-Type": "text/plain"});
                        response.write('400 BAD REQUEST - No game ID was specified');
                        response.end();
                    }
                } else {
                    response.writeHead(400, {"Content-Type": "text/plain"});
                    response.write('400 BAD REQUEST - No game ID was specified');
                    response.end();
                }
                break;
                
            case "resetgame":
                if(requestQuery) {
                    var gameID = requestQuery.id;
                    if(gameID) {
                        
                        var selectedGame = ALL_GAMES[gameID];
                        
                        if(!selectedGame) {
                            response.writeHead(400, {"Content-Type": "text/plain"});
                            response.write('404 NOT FOUND - There is no game with ID='+gameID);
                            response.end();
                        } else {
                            var result = selectedGame.reset();
                            
                            response.send(result);
                        }
                        
                    } else {
                        response.writeHead(400, {"Content-Type": "text/plain"});
                        response.write('400 BAD REQUEST - No game ID was specified');
                        response.end();
                    }
                } else {
                    response.writeHead(400, {"Content-Type": "text/plain"});
                    response.write('400 BAD REQUEST - No game ID was specified');
                    response.end();
                }
                break;
            
            case "stopgame":
                if(requestQuery) {
                    var gameID = requestQuery.id;
                    if(gameID) {
                        
                        var selectedGame = ALL_GAMES[gameID];
                        
                        if(!selectedGame) {
                            response.writeHead(400, {"Content-Type": "text/plain"});
                            response.write('404 NOT FOUND - There is no game with ID='+gameID);
                            response.end();
                        } else {
                            delete ALL_GAMES['' + gameID]
                            
                            response.send({success:true, message:'Game with ID=' + gameID + ' stopped successfully'});
                        }
                        
                    } else {
                        response.writeHead(400, {"Content-Type": "text/plain"});
                        response.write('400 BAD REQUEST - No game ID was specified');
                        response.end();
                    }
                } else {
                    response.writeHead(400, {"Content-Type": "text/plain"});
                    response.write('400 BAD REQUEST - No game ID was specified');
                    response.end();
                }
                break;
                
            default:
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write('404 NOT FOUND');
                response.end();
        }
        
        
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write('404 NOT FOUND');
        response.end();
    }
});

app.post('*', function(request,response,body) {
    if(request.url.substr(0,5) === '/api/') {
        console.log('Chess API was called');
        
        var requestPath = request.url.substr(5);
        var requestQuery = request.query;
        var requestBody = request.body;
        
        if(requestPath.indexOf('?') !== -1) {
            var questionIndex = requestPath.indexOf('?');
            requestPath = requestPath.substr(0,questionIndex);
        }
        
        requestPath = requestPath.toLowerCase();
            
        switch(requestPath) {
                
            case "movepiece":
                
                if(requestQuery) {
                    var gameID = requestQuery.id;
                    if(gameID) {
                        
                        var selectedGame = ALL_GAMES[gameID];
                        
                        if(!selectedGame) {
                            response.writeHead(400, {"Content-Type": "text/plain"});
                            response.write('404 NOT FOUND - There is no game with ID='+gameID);
                            response.end();
                        } else {
                            console.log(requestBody)
                            var player = requestBody.player;
                            var oCol = requestBody.oCol;
                            var oRow = requestBody.oRow;
                            var dCol = requestBody.dCol;
                            var dRow = requestBody.dRow;
                            
                            var moveResult = selectedGame.move(player, oCol, oRow, dCol, dRow);
                            
                            response.send(moveResult);
                        }
                        
                    } else {
                        response.writeHead(400, {"Content-Type": "text/plain"});
                        response.write('400 BAD REQUEST - No game ID was specified');
                        response.end();
                    }
                } else {
                    response.writeHead(400, {"Content-Type": "text/plain"});
                    response.write('400 BAD REQUEST - No game ID was specified');
                    response.end();
                }
                break;
                
            default:
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write('404 NOT FOUND');
                response.end();
        }
        
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write('404 NOT FOUND');
        response.end();
    }
});

var server = http.createServer(app);
server.listen(app.get('port') ,app.get('ip'), function () {
    console.log("✔ Express server listening at %s:%d ", app.get('ip'),app.get('port'));
});