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
    
                this.img = undefined;

                this.actives = true; // 死亡状态
    
                for (var key in params) {
    
                   this[ key ] = params[ key ];
    
                }
                

                return this;
            },

            kill:function(){

                if( (this.life -= 1) <= 0 )
                    this.actives = false;

            },

            isDie:function(){

                return this.actives;

            }


    
        }
    
        return window.Brick = Brick;
    
    
    } )( window , undefined )