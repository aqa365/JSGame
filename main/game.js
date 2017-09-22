( function( window , fun ){
 
    if ( typeof define === "function" && define.amd ) {   

        define( [], function () {  return fun( window ); } );    

    }else{

        window.YFGame = fun( window );

    }

} )( window , function( window , undefined ){

    var YFGame = function( selector ){
        return this.init( selector );
    }

    YFGame.fn = YFGame.prototype = {

        constructor : YFGame,

        init : function( selector ){
            var canvas = document.querySelector( selector );
            var context = canvas.getContext( '2d' );

            this.canvas = canvas;
            this.context = context;

            this.params = {

                keyStatus:{},

                actions : {},

            }
            var that = this;
            var params = this.params;

            // 监听器
            setInterval( function(){

                for (var i in  Object.keys( params.actions ) ) {

                    var key = Object.keys( params.actions )[ i ];

                    if( params.keyStatus[ key ] ){

                        params.actions[ key ]();   
                        
                        //that.update();

                    }

                }

              
                
            } , 1000/30 );

            // events
            window.addEventListener( 'keydown' , function( e ){

                params.keyStatus[ e.key ] = true;

            } );

            window.addEventListener( 'keyup' , function( e ){

                params.keyStatus[ e.key ] = false;

            } )

            return this;

        },

        registerKey : function( key , callback ){

            this.params.actions[ key ] = callback;

            return this;

        },

        drawImg:function( path , x , y ){

            var that = this;

            var img = new Image();
            img.src = path;
            img.onload = function(){
                that.context.drawImage( img , x , y );
            }

            return img;

        },

        update:function(){}
    }


    return YFGame;

} )