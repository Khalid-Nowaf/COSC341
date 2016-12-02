import { Component } from '@angular/core';
import {Shake} from 'ionic-native';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    let watch = Shake.startWatch(60).subscribe(() => {
  console.log('shake me beby !!');
  });



  }

}
