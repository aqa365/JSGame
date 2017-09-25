( function( window , undefined ){


    var Bullet  = function( params ){

        return this.init( params )

    }

    Bullet.fn = Bullet.prototype = {
        constructor: Bullet,

        init:function( params ){

            this.x = 0;
            this.y = 0;

            this.speedX = 10;
            this.speedY = 10;

            this.fired =  false;

            this.img = undefined;

            for (var key in params) {
               
                this[ key ] = params[ key ];

            }

            return this;
        },

        fire:function(){

            this.fired = true;

        },

        move:function(){

            if( !this.fired )return;
            
            if( this.x <= 0||this.x + this.img.width > 400 ){
                
                this.speedX *= -1;

            }
            if( this.y <= 0||this.y + this.img.height > 300 ){

                this.speedY *= -1;

            }

            this.x += this.speedX;
            this.y += this.speedY;

        },
        // 未发射之前应该跟随 paddle
        follow:function( x ){
            if( x < 0 )
                x = 0;
            if( x > 400 - this.img.width )
                x = 400 - this.img.width;

            this.x = x;
        },
        followLeft:function( speed ){

            if( this.fired ) return;

            this.follow( this.x - speed );
            
        },
        followRight:function( speed ){

            if( this.fired ) return;

            this.follow( this.x + speed );

        },
        // 反弹
        rebound:function(){
            
            this.speedY *= -1;

        }

        
    }

    return window.Bullet = Bullet;

} )( window )