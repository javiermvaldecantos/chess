#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var http    = require('http');

/* Chess logic */
var chess = require('./api/chess.js');

var app = express();

var http = require('http');

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

app.get('*',function(request,response) {
    if(request.url.substr(0,5) === '/api/') {
        console.log('Chess API was called');
    }
	response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('THE APP WORKS!');
    response.end();
});

var server = http.createServer(app);
server.listen(app.get('port') ,app.get('ip'), function () {
    console.log("✔ Express server listening at %s:%d ", app.get('ip'),app.get('port'));
});