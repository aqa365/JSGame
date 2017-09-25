(function( window , undefined ){

    function debugFunction( state ){
        
        if( !state ) return;
    
        window.addEventListener( 'keydown' ,function( e ){
    
            var key = e.key;
    
            if( '123456789'.includes( key ) ){
                
                initBricks( levels( Number( key ) ) );

            }
            else if( key == 'o'){

                g.start();

            }
            else if( key == 'p' ){

                g.stop();

            }
        })
        
    }

    var g = new YFGame( '#idcanvas' );  
    
    var paddle = new Paddle( { x:120 , y:250 , speed:7 , img:g.loadImg( 'images/1.jpg' ) } );

    var bullet = new Bullet( { x:190 , y:227 , speedX:5 , speedY:5 , img:g.loadImg( 'images/fire.png' ) } );

    // 关卡
    var level = levels( 1 );

    var bricks = []; // 砖块

    var brickImg = g.loadImg( 'images/brick.png' );

    // 初始化砖块
    function initBricks( level ){

        bricks.splice( 0 , bricks.length );

        for( var i in level ){

            var item = level[ i ];

            item.img = brickImg;

            bricks.push( new Brick( item ) );

        }

    }

    // 遍历砖块回调
    function eachBricks( bricks , callback ){

        for( var i in bricks ){

            var item = bricks[ i ];

            callback.call( item , i , item );            

        }

    }

    initBricks( level );

    debugFunction( true );

    // events
    g.registerKey( 'a' ,function(){ 

        paddle.moveLeft();
        bullet.followLeft( paddle.speed );

    } );

    g.registerKey( 'd' ,function(){   

        paddle.moveRight();
        bullet.followRight( paddle.speed );

    } );

    g.registerKey( 'f' ,function(){

        bullet.fire();

    })

    g.update = function(){

        bullet.move();

        // 如果 球、船 相撞
        if( this.collision( paddle , bullet ) ){

            bullet.rebound();

        }

        // 球、砖 相撞
        eachBricks( bricks , function(){

            if( g.collision( bullet , this ) && this.isDie() ){

                this.kill();

                bullet.rebound();

            }

        } )
       

    }

    g.draw = function(){

        this.drawImg( paddle ).drawImg( bullet );

        // 绘制砖块
        eachBricks( bricks , function(){

            if( this.isDie() )
                g.drawImg( this );

        } )

    }

    log( g );

    log( paddle ); 

    log( bullet );

    log( bricks );

})( window , undefined )