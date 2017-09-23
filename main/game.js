( function( window , fun ){
 
    if ( typeof define === "function" && define.amd ) {   

        define( [], function () {  return fun( window ); } );    

    }else{

        window.YFGame = fun( window );

    }

} )( window , function( window , undefined ){

    var YFGame = function( selector ){
        return this.init( selector );
    },

    // 每一帧
    listener = function(){

        for (var i in  Object.keys( this.params.actions ) ) {
            
            var key = Object.keys( this.params.actions )[ i ];

            if( this.params.keyStatus[ key ] ){

                this.params.actions[ key ]();   
                
            }

        }

        this.context.clearRect( 0 , 0 , this.canvas.width , this.canvas.height );

        
        this.update.call( this );

        this.draw.call( this );

        this.context.fillText( FPS + "fps" , 2 , 10);

    },

    // 适应用户fps调整
    initFps = function(){

        var that = this;
        
        if( this.fps != window.fps ){
            
            this.fps = window.fps;

            createInterval.call( this );

            return true;
        }

        return false;
    },

    //创建定时器
    createInterval = function(){

        clearInterval( this.interval );
        var that = this;
        this.interval = setInterval( function(){

            that.calaFps +=1;

            if( initFps.call( that ) ) return;

            listener.call( that );

        } , window.fps == 0 ? 0 : 1000/window.fps );
    },
    // 用来记录每秒帧率
    FPS = 0

    YFGame.fn = YFGame.prototype = {

        constructor : YFGame,

        init : function( selector ){
            var canvas = document.querySelector( selector );
            var context = canvas.getContext( '2d' );

            this.canvas = canvas;
            this.context = context;

            this.verticalSync = true; // 垂直同步

            this.calaFps = 0; // 计算帧率

            this.fps = window.fps = window.fps || 60;

            this.params = {

                keyStatus:{},

                actions : {},

            }
            var that = this;
            var params = this.params;

            // 创建定时器
            createInterval.call( this );

            // 监控fps
            setInterval( function(){
                FPS = that.calaFps;
                that.calaFps = 0;
            }, 1000 )

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

        collision:function( a , b ){

            //!(B.max(x) < A.min(x) || B.min(x) > A.max(x) || B.max(y) < A.min(y) || B.min(y) > A.max(y))
            if( b.x + b.img.width < a.x || b.x > a.x+a.img.width || b.y + b.img.height < a.y || b.y > a.y + a.img.height )
                return false;

            return true;


        },
        // 开始
        start:function(){
            createInterval.call( this );
        },

        // 暂停
        stop:function(){
            clearInterval( this.interval );         
        },

        // 在外部重写draw、update function\
        update:function(){},
        draw:function(){}

    }


    return YFGame;

} )