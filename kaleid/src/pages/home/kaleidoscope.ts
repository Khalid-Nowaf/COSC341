/**
 * Kaleidoscope
 * 
 */
export class Kaleidoscope {

     HALF_PI = Math.PI / 2;
     TWO_PI  =  Math.PI * 2;
      // settings 
      offsetRotation: number;
      offsetScale: number;
      offsetX: number;
      offsetY: number;
      radius: number;
      slices: number;
      zoom: number;
      // click 
      tx:number;
      ty:number;
      tr:number;
      //
      scale:number;
      step:number;
      cx:number;
      cy:number;
      // DOM
      docElem: HTMLCanvasElement;
      context: CanvasRenderingContext2D;
      image: HTMLImageElement;
    constructor(img:HTMLImageElement, slices:number) {

       
    // Defaults settings 
      this.offsetRotation = 0.0;
      this.offsetScale = 1.0;
      this.offsetX = 0.0;
      this.offsetY = 0.0;
      this.radius = 260;
      this.slices = slices;
      this.zoom = 1.0;

     // Mouse events
      this.tx = this.offsetX
      this.ty = this.offsetY
      this.tr = this.offsetRotation
      // setup DOM
      this.docElem = document.createElement('canvas');
      this.docElem.style.background = 'black';
      this.context = this.docElem.getContext('2d');
      this.image = img; 

  setInterval(() => { // rander the image at 60 frame/sec
       this.update()
       this.draw();
     }, 1000/60 );
    }

     public draw() {
    this.radius = window.parent.innerWidth < window.parent.innerHeight ? window.parent.innerWidth / 2 :  window.parent.innerHeight / 2  ;
    this.docElem.width = this.docElem.height = this.radius * 2; // set the width and height 
    this.context.fillStyle = this.context.createPattern(this.image,'repeat'); // fill the context with repeated image pattern
    
    this.scale = this.zoom * ( this.radius / Math.min(this.image.width, this.image.height));
    this.step = this.TWO_PI / this.slices;
    this.cx = this.image.width / 2;

    for(let i = 0; i <= this.slices ; i++ ) { // need to be debuged !!
      this.context.save();
      this.context.translate(this.radius,this.radius);
      this.context.rotate(i * this.step);
      this.context.beginPath();
      this.context.moveTo(-0.5, -0.5);
      this.context.arc(0,0,this.radius,this.step * -0.51,this.step * 0.51);
      this.context.lineTo(0.5,0.5);
      this.context.closePath();

      this.context.rotate(this.HALF_PI);
      this.context.scale (this.scale,this.scale);
      this.context.scale([-1,1][i % 2], 1); // not sure !!
      this.context.translate(this.offsetX - this.cx, this.offsetY);
      this.context.rotate(this.offsetScale);
      this.context.scale(this.offsetScale,this.offsetScale);

      this.context.fill();
      this.context.restore();
      
    }
  }

onMouseMoved (event:MouseEvent){
    console.log('mouse moved !!');
    this.cx = (window.innerWidth /2) ;
    this.cy = (window.innerHeight / 2);

   
    let dx = event.pageX /  window.innerWidth;
    let dy = event.pageY /  window.innerHeight;

     let hx = dx - 0.5;
     let hy = dy - 0.5;

    this.tx = hx * this.radius * - 5;
    this.ty = hy * this.radius * 5;
    this.tr = Math.atan2(hy,hx);

  }

  // onDeviceMoved (x:number,y:number){
  //   console.log('mouse moved !!');
  //   this.cx = window.innerWidth /2 ;
  //   this.cy = window.innerHeight / 2;

   
  //   let dx = x;
  //   let dy = y;

  //    let hx = dx - 0.5;
  //    let hy = dy - 0.5;

  //   this.tx = hx * this.radius * - 2;
  //   this.ty = hy * this.radius * 2;
  //   this.tr = Math.atan2(hy,hx);

  // }

  public update() {
       let delta = this.tr - this.offsetRotation;
       let theta = Math.atan2(Math.sin(delta),Math.cos(delta));
       this.offsetX += (this.tx - this.offsetX) * 0.01 // ease
       this.offsetY += (this.ty - this.offsetY) * 0.01 // ease
       this.offsetRotation += (theta - this.offsetRotation) * 0.01
     
  }


}