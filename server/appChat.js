var app = require('http').createServer(handler).listen(80),
    io = require('socket.io')(app),
    fs = require('fs'),
    jsonObj = require("./package.json");

io.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('checkUser', function ( data ) {
        //try {
        jsonObj.users.forEach( function ( i ) {
            if( data.n == i.nickname){
                i.cred.forEach( function ( y ) {
                    if( data.p == y.pass ){
                        //console.log("OK");
                        fs.sendfile(__dirname + './ChatForm.html');
                    }else{
                        console.log("username or password is incorrect");
                    }
                })
            }else{
                console.log("username or password is incorrect");
                //console.log("The username \'" + data.n + "\' is absent or invalid");
            }

            //    if( data.n != i.nickname){
            //        throw 'throwing exception';
            //    }else{
            //        i.cred.forEach( function ( y ) {
            //            if( data.p == y.pass ){
            //                console.log("OK");
            //            }
            //        })
            //    }
            //})
            //} catch(e){
            //    console.log("The User name \'" + data.n + "\' is absent or invalid");
            //
            //}
        })
    })
})

function handler (req, res) {
    fs.readFile(__dirname + '/LoginForm.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading html file');
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

