var PORT = 8008,
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server, options);

server.listen(PORT);

app.use( '/static', express.static( __dirname + '/static' ) );

app.get( '/', function ( req, res ) {
    res.sendfile( __dirname + '/index.html' );
});

io.sockets.on('connection', function (client) {
    client.on('message', function (message) {
        try {
            client.emit('message', message);
            client.broadcast.emit('message', message);
        } catch (e) {
            console.log(e);
            client.disconnect();
        }
    });
});