import { Camera } from 'ionic-native';
import { Base64ToGallery } from 'ionic-native';
import { Kaleidoscope } from './kaleidoscope';
import { Component,ViewChild , ElementRef} from '@angular/core';
import { NavController} from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  @ViewChild("home") el:ElementRef; // this is just ref of div element
  img: HTMLImageElement; 
  kd: Kaleidoscope;


  constructor(public navCtrl: NavController) {

    this.img = new Image;
    this.img.src = 'assets/img/cm.jpg'; 
    this.kd = new Kaleidoscope(this.img,30);
   
    //config the DOM elm
    this.kd.docElem.style.position = 'absolute';
    this.kd.docElem.style.left = '0';

  }

  ngAfterViewInit() {
     // append 
     this.el.nativeElement.appendChild(this.kd.docElem);
  }

 
   /**
    * @param  {MouseEvent} event
    * track touch movements movement
    */
   move(event:MouseEvent){
      this.kd.onMouseMoved(event);
   }
  /**
   * @param  {string} v
   * add or subtract the number of slices
   */
  changeSlices(v:string){
    if(v == 'add'){
     this.kd.slices += 2;
    } else {
      if(this.kd.slices > 4)
      this.kd.slices -= 2;
    }
    this.kd.draw();
  }
   /**
    * @param  {string} src
    * 
    */
  //  changeImg(src:string) {
  //    this.kd.image.src = 'https://s-media-cache-ak0.pinimg.com/originals/b5/74/be/b574be54e045c6a324dbec610a44b442.jpg';
  //    this.kd.draw();
  //  }


    /**
     * Save the image to Gallary
     */ 
    saveImg() {
      let dt = this.kd.docElem.toDataURL();
      console.log(dt);
      Base64ToGallery.base64ToGallery(dt,{mediaScanner:true}).then(
      res => alert("saved!!"),
      err => alert(err)
);
      
    }
    /**
     * Pick img from Gallary
     */
    pickImg(){

      let options = {
        destinationType:0,
        sourceType:1,
        allowEdit:true
      }

      Camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.kd.image.src = base64Image;
        this.kd.draw()
      }, (err) => {
        console.log(err);
      });
    }



}
