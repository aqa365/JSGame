class YFGame{

    constructor( el , params ){

        this.status = true;
        this.fps = {
            current : 0,
            calc : 0
        };
        this.keyStatus = {};
        this.actions = {};

        this.canvas = document.querySelector( el );
        this.context = this.canvas.getContext( '2d' );

        window.addEventListener( 'keydown' , ( e ) => {       
            this.keyStatus[ e.key ] = true;       
        } );
            
        window.addEventListener( 'keyup' , ( e ) => {
            this.keyStatus[ e.key ] = false;
        } )

        this._initParams( params );

        this._listener();

        this._timing();

    }

    _initParams( params ){
        this.params = {            
            fps : 60,
            draw : undefined ,
            update : undefined ,
        }

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                this.params[ key ] = params[key];
                
            }
        }
    }

    _executeKeyAction(){
        for (var i in  Object.keys( this.actions ) ) {
            
            var key = Object.keys( this.actions )[ i ];

            if( this.keyStatus[ key ] ){

                this.actions[ key ]();   
                
            }

        }
    }

    _listener(){       

        setTimeout( () => {
            
            if( !this.status ) return; 
            this._executeKeyAction();
            this.update();
            this.draw();
            this._listener();

        } , this.params.fps ? 1000 / this.params.fps : 0 )

    }
    _timing(){
        setInterval( () => {
            this.fps.current = this.fps.calc;
            this.fps.calc = 0;
        } , 1000 )
    }
    
    registerKey( key , callback ){
        this.actions[ key ] = callback;
        return this;
    }

    update(){
        ++this.fps.calc;
        if( this.params.update )this.params.update.call( this );
    }

    draw(){
        this.context.clearRect( 0 , 0 , this.canvas.width , this.canvas.height );
        if( this.params.draw )this.params.draw.call( this );
        this.context.fillText( this.fps.current + "fps" , 2 , 10);
    }

    loadImage( path_images ){
        var img = new Image();
        img.src = path;
        return img;
    }

    
    drawImage( obj ){

        this.context.drawImage( obj.img , obj.x , obj.y );

        return this;
    }

    start(){
        this.status = true;
    }

    stop(){
        this.status = false;
    }

    setFps( num ){
       return this.params.fps = num;
    }

    
}
