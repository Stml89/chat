/*var PORT = 80;

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var jsonObj = require("./package.json");
server.listen(PORT);

app.use('/static', express.static(__dirname + '/server'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/LoginForm.html');
});

app.get('/chat', function (req, res) {
    res.sendfile(__dirname + '/chatForm.html');
});

io.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('checkUser', function ( data ) {
        jsonObj.users.forEach( function ( i ) {
            if( data.n == i.nickname){
                i.cred.forEach( function ( y ) {
                    if( data.p == y.pass ){

                        console.log("OK");
                        chunk = chunk.replace('/ChatForm.html');
                        //fs.sendFile(__dirname + '/ChatForm.html');
                    }/*else{
                        console.log("username or password is incorrect");
                    }
                })
            }else{
                console.log("username or password is incorrect");
            }
        })
    })
})*/

var app = require( 'http' ).createServer( handler ).listen( 80 ),
    io = require( 'socket.io' )( app ),
    fs = require( 'fs' ),
    jsonObj = require( './package.json' );

io.sockets.on('connection', function ( socket ) {
    socket.broadcast.emit( 'message', { message: ' has joined this chat' } );
    socket.on( 'send', function ( message ) {
        try{
            socket.emit( 'message', message );
            socket.broadcast.emit( 'message', message );
        }catch( e ){
            console.log( e );
        }
    });

    socket.on('checkUser', function ( data ) {
        //try {
        jsonObj.users.forEach( function ( i ) {
            if( data.n == i.nickname ) {
                i.cred.forEach( function ( y ) {
                    if( data.p == y.pass ) {
                        socket.emit( 'ok' );
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

function handler ( req, res ) {
   /* if( req.url == '/' ){
        var filename = __dirname + '/LoginForm.html',
            readStream = fs.createReadStream( filename );
        readStream.pipe( res );
    } else if( req.url == '/chat' ) {
        var filename = __dirname + '/chatForm.html',
            readStream = fs.createReadStream( filename );
        readStream.pipe( res );
    }else{
        console.log("bad url, 404");
    }*/
    if( req.url == '/LoginForm.html' ) {
        var filename = __dirname + req.url,
            readStream = fs.createReadStream( filename );
        readStream.pipe( res );

    } else if( req.url == '/chatForm.html' ) {
        var filename = __dirname + req.url,
            readStream = fs.createReadStream( filename );
        readStream.pipe( res );
    }
}