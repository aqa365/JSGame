class Person{
    constructor( x , y , speed , images){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.img = new Image();
        this.images = images;
        this.index = 0;
    }

    defaultAction(){

        this.index = this.index + 1 >= this.images.length ? 0 : this.index + 1;
        this.img.src = this.images[ this.index ];

    }

}