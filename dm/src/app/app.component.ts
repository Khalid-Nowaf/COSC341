import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { DeviceMotion, AccelerationData } from 'ionic-native';
import { HomePage } from '../pages/home/home';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

        // Watch device acceleration
var subscription = DeviceMotion.watchAcceleration().subscribe((acceleration: AccelerationData) => {
  console.log(acceleration);
});

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
