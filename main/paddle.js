( function( window , undefined ){

    var Paddle = function( params ){

        return this.init( params );

    }
    
    Paddle.fn = Paddle.prototype = {

        consturctor: Paddle,

        init:function( params ){

            this.x = 0;
            this.y = 0;

            this.speed = 5;

            this.img = undefined;

            for (var key in params) {

               this[ key ] = params[ key ];

            }

            return this;
        },
        move:function( x ){

            if( x < 0  )
                x = 0;

            else if( x > 400 - this.img.width )
                x = 400 - this.img.width;

            this.x = x;

        },
        moveLeft:function(){

            this.move( this.x - this.speed );

        },

        moveRight:function(){

            this.move( this.x + this.speed )
            
        }

    }

    return window.Paddle = Paddle;


} )( window , undefined )