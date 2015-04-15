var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);
io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
})

function handler (req, res) {
    fs.readFile(__dirname + '/LoginForm.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}



//module.exports = function( app, io ) {
//
//    app.get( '/', function ( req, res ) {
//        res.sendfile( __dirname + '/LoginForm.html' );
//    });
//
//    app.get( '/chatform', function( req, res ) {
//        res.sendfile( __dirname + '/chatForm.html' );
//    });
//
//    io.sockets.on( 'connection', function (client) {
//        client.on( 'message', function ( message ) {
//            try {
//                client.emit( 'message', message );
//                client.broadcast.emit( 'message', message );
//            } catch ( e ) {
//                console.log( e );
//                client.disconnect( );
//            }
//        });
//    });
//}

