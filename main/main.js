(function( window , undefined ){

    var g = new YFGame( '#idcanvas' );  
    
    var paddle = new Paddle( { x:120 , y:250 , speed:5 , img:g.loadImg( 'images/1.jpg' ) } );

    var bullet = new Bullet( { x:190 , y:219 , speedX:7 , speedY:12 , img:g.loadImg( 'images/fire.png' ) } );

    var brickImg = g.loadImg( 'images/brick.png' );
    var jiange = 27,x = 90;
    var bricks = new Brick( { coordinates:[ [jiange,0] , [ x+jiange,0 ] , [ x*2+jiange,0 ] , [ x*3+jiange,0 ] ] , img:brickImg } );

    // events
    g.registerKey( 'a' ,function(){ 

        paddle.moveLeft();

    } );

    g.registerKey( 'd' ,function(){   

        paddle.moveRight();

    } );

    g.registerKey( 'f' ,function(){

        bullet.fire();

    })

    g.registerKey( 'p' ,function(){
        g.stop();
    } )

    window.addEventListener( 'keydown' ,function( e ){
        if( e.key=='o'){
            g.start();
        }
      
    })

    g.update = function(){

        bullet.move();

        // 如果 球、船 相撞
        if( this.collision( paddle , bullet ) ){

            bullet.rebound();

        }

        
        for( var i in bricks ){
            var item = bricks[ i ];

            // 如果 球、砖块 相撞
            if( this.collision( bullet , item ) && item.state ){
                item.kill();
                bullet.rebound();
            }
        }
    }

    g.draw = function(){

        this.drawImg( paddle ).drawImg( bullet );

        //砖块
        for( var i in bricks ){

            if( bricks[ i ].state ){
                this.drawImg( bricks[ i ] );
            }

        }
        
    }

    log( g );

    log( paddle ); 

    log( bullet );

    log( bricks );

})( window , undefined )