import { HomePage } from './../pages/home/home';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, ScreenOrientation } from 'ionic-native';



@Component({ 
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
if(!platform.is('core'))
ScreenOrientation.lockOrientation('portrait-primary'); // lock the Screen Orientation

     StatusBar.backgroundColorByHexString('#0D47A1'); // set status bar to color
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     // StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
