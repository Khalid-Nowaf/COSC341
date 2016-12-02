import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


enum STATUS {
  NEW,
  AGAIN,
  WIN,
  LOSS
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  point:number;
  rolled:number;
  die1:string;
  die2:string;
  die3:string;
  die4:string;
  dice:Array<string>;
  status:STATUS;
  msg:string;


  

  constructor(public navCtrl: NavController) {

    this.loadDice();
    this.point = 0;
    this.rolled = 0;
    this.msg = 'Click Play to start the game!';
  }

  loadDice(){
    this.status = STATUS.NEW;
    this.dice = [];
    this.dice[0] = "assets/img/blank1.png";

    for(let i = 1; i <= 6; i++){
      this.dice[i] = "assets/img/die"+i+".png";
    }

    // blank dice
    this.die1 = this.dice[0];
    this.die2 = this.dice[0];
    this.die3 = this.dice[0];
    this.die4 = this.dice[0];

  }

  roll(){
    let d1 = Math.floor(Math.random() * 6) + 1 ;
    let d2 = Math.floor(Math.random() * 6) + 1 ;

    if(this.status == STATUS.NEW){
      this.die1 = this.dice[d1];
      this.die2 = this.dice[d2];
      this.check();
    }else {
      this.die3 = this.dice[d1];
      this.die4 = this.dice[d2];
      this.check();
    }
  }

  check(){

    if(this.status == STATUS.NEW){
        this.status = STATUS.AGAIN;
         this.msg = 'Roll Again';
    }else if(this.status == STATUS.AGAIN){
        this.status = STATUS.WIN;
        this.msg = 'You Win!';
    }
  }

}
