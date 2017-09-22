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
                        
                    }

                }

                that.context.clearRect( 0 , 0 , that.canvas.width , that.canvas.height );

                that.draw();
                
            } , 1000/60 );

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

        loadImg:function( path ){

            var img = new Image();
            img.src = path;
            return img;

        },

        drawImg:function( obj ){

            this.context.drawImage( obj.img , obj.x , obj.y );

            return this;
        },

        // 在外部重写draw function
        draw:function( ){

        }

    }


    return YFGame;

} )