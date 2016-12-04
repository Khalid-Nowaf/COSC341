import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  point: number;
  rolled: number;
  die1: number;
  die2: number;
  die3: number;
  die4: number;
  status: string;
  msg: string;




  constructor(public navCtrl: NavController) {

    this.loadDice();
     this.msg = 'Click Play to start the game!';
  }

  loadDice() {
    this.status = 'new';
    this.point = 0;
    this.rolled = 0;
   
    // blank dice
    this.die1 = 0;
    this.die2 = 0;
    this.die3 = 0;
    this.die4 = 0;

  }

  play() {
    this.loadDice();
    let d1 = Math.floor(Math.random() * 6) + 1;
    let d2 = Math.floor(Math.random() * 6) + 1;
    this.die1 = d1;
    this.die2 = d2;
    this.check();
  }

  roll() {
    let d1 = Math.floor(Math.random() * 6) + 1;
    let d2 = Math.floor(Math.random() * 6) + 1;

    this.die3 = d1;
    this.die4 = d2;
    this.check();
  }

  check() {

    if (this.status == "again") { // if this a roll
      let sum = this.die3 + this.die4;
      this.rolled = sum;
      if (sum == 7) {
        this.status = "loss";
      } else if (sum == this.point){
        this.status = 'win';
      }
      else {
        this.rolled = sum;
      }
    } else if (this.status == "new"){ // if this just new play
       let sum = this.die1 + this.die2;
       this.point =sum;
      if (sum == 7 || sum == 11) {
        this.status ="win";
      } else if (sum == 2 || sum == 3 || sum == 12) {
        this.status = "loss";
      } else {
        this.status ="again";
        this.point = sum;
      }
    }

    switch (this.status) {
      case "win":
        this.msg = "YOU WIN !!";
        break;
      case "loss":
        this.msg = 'Craps !, You lost the game !!';
        break;
      case "again":
        this.msg = "Roll Again !";
      default:
        break;
    }
  }

}
