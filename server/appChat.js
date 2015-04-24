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

    socket.on( 'checkUser', function ( data ) {
        for( var i in jsonObj.users ) {
            if( data.n == jsonObj.users[i].nickname ) {
                if( data.p == jsonObj.users[i].cred.pass ) {
                    socket.emit( 'ok' );
                }else{
                    console.log("username or password is incorrect");
                    return false;
                }
            }
        }
    })

    socket.on( 'addNewUser', function ( data ) {
        var y = jsonObj.users.length;
        //do not work correctly
        for( var i in jsonObj.users ) {
            if( data.n != jsonObj.users[i].nickname ) {
                if( data.m != jsonObj.users[i].cred.email ) {
                    jsonObj.users[ y ] = {
                        "nickname": data.n,
                        "cred": {
                            "email": data.m,
                            "pass": data.p
                        }
                    }

                    fs.writeFile( 'package.json', JSON.stringify( jsonObj ), function( err ) {
                        if ( err ) return console.log( err );
                    });

                    socket.emit( 'ok' );
                }else{
                    console.log("Sorry, that email is already taken");
                    return false;
                }
            }else{
                console.log("Sorry, that username is already taken");
                return false;
            }
        }
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
    if( req.url == '/' ) {
        var filename = __dirname + '/LoginForm.html',
            readStream = fs.createReadStream( filename );
        readStream.pipe( res );

    } else if( req.url == '/chatForm.html' ) {
        var filename = __dirname + req.url,
            readStream = fs.createReadStream( filename );
        readStream.pipe( res );

    } else if( req.url == '/index.html' ) {
        var filename = __dirname + req.url,
            readStream = fs.createReadStream( filename );
        readStream.pipe( res );
    }
}