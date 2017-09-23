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

        moveLeft:function(){

            this.x -= this.speed;  

        },

        moveRight:function(){

            this.x += this.speed; 
            
        }

    }

    return window.Paddle = Paddle;


} )( window , undefined )