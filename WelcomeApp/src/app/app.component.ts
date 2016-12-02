import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, ScreenOrientation } from 'ionic-native';

import { HomePage } from '../pages/home/home';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // change status bar color
       StatusBar.backgroundColorByHexString('#1A237E');
      // allow user rotate
       ScreenOrientation.unlockOrientation();
       
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
