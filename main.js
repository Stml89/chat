/**
 * Created by stml on 4/13/15.
 */
function checkUser(){
    loadJSON('package.json');
};

function loadJSON( url ) {
    $.getJSON( url,
        function( data ) {
            getUsrCred( data )
        });
}

function getUsrCred( data ){
    //$("form#loginForm").submit(function() { // loginForm отправлена
        var username = $('#username').attr('value'), /* получить username*/
            password = $('#password').attr('value'); /* получить password*/


        if( username && password ){
            data.users.forEach( function( i ){
                if( i.nickname == username ){
                    i.cred.forEach( function ( y ) {
                        if( y.pass = password ){
                            flag = true;
                            console.log( y.email );
                            console.log("you have logged successfully");
                            document.location.href = "server/chatForm.html";
                        }
                    })
                }
            } )
        }else{
            alert( "fill username or password" )
        }

        if( flag == false ){
            alert( "net sovpadenii, vam nado zareg." );
        }
    //});
}

function asd()
{

}