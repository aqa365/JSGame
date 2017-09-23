( function( window , undefined ){
    
        var Brick = function( params ){
    
            return this.init( params );
    
        }
        
        Brick.fn = Brick.prototype = {
    
            consturctor: Brick,
    
            init:function( params ){
    
                this.x = 0;
                this.y = 0;
                
                this.life = 1;

                this.coordinates = []; // 坐标
    
                this.img = undefined;

                this.state = true; // 死亡状态
    
                for (var key in params) {
    
                   this[ key ] = params[ key ];
    
                }
                
                if( this.coordinates.length <= 0 ) return this;

                var bricks = [];

                for( var i in this.coordinates ){
                    var item = this.coordinates[ i ];
                    bricks.push( new Brick( { x:item[ 0 ] , y:item[ 1 ] , img:this.img  } ) );
                }

                return bricks;
            },

            kill:function(){

                this.state = false;

            }


    
        }
    
        return window.Brick = Brick;
    
    
    } )( window , undefined )