import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  status:string;
  posMoves: Array<number>; // legal moves
  board : Array<string>;  // matrix
  Blank : number;         // blank cell
  count : number;
  msg: string;

  constructor(public navCtrl: NavController) {
    this.count = 0;
    this.status = 'N'; // game status new 
   this.board = [];
   this.posMoves = [];
   this.msg = '';
   this.buildBoard();
    this.shuffle();
   
  
  }

  buildBoard(){
     for( let i = 0; i < 16 ; i++){
      this.board.push('assets/img/'+i+'.png');
    }
  }

   shuffle() { 
    for (let i = this.board.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [this.board[i - 1], this.board[j]] = [this.board[j], this.board[i - 1]];
    }
    this.status = 'N';
    this.setB();
    this.pMoves(this.Blank);
    this.count = 0;
    this.msg = '';

}

    pMoves(i:number){
      this.posMoves = [];
   
      // check right
      if((i + 1) % 4 != 0) // right border and last elm
      this.posMoves.push(i+1);

      // check left
      if((i + 1) % 4 != 1)
      this.posMoves.push(i - 1);

       // check up 
       if((i - 4 )>= 0)
       this.posMoves.push(i - 4);
      

     // check down
       if((i + 4 ) <= 15)
       this.posMoves.push(i + 4);

    }

    setB() {
      this.Blank = Number(
        this.board.findIndex( el => {
        return el == 'assets/img/15.png';
       })
      );
    }

    move(i:number) {

      
      if( undefined != this.posMoves.find(el => {
         return el == i;   }) && (this.status == 'N' || this.status == 'G') )
     {
       this.msg = '';
       this.status = 'G'; // game status gameOn
       // swap
       let tmp = this.board[this.Blank];
       this.board[this.Blank] = this.board[i]; 
       this.board[i] = tmp; 
       this.Blank = i;
       
       this.count++;
       console.log(this.count);
       if(this.check()) { // if win
         this.status = 'W'; // game status win !
         this.msg = "You solved the puzzle in "+this.count+" moves!";
       } else 
       this.pMoves(i); // find  and update legal moves 
      } else {
        this.msg = this.status != 'W' ? 'Illegal move!': this.msg;
      }
    }

    check() {
        let s = true;
      for(let i = 0; i <= 15 ; i++) {
        if(this.board[i] != 'assets/img/'+i+'.png')
        s = false;
      }
      return s;
    }

    solve() {
       for( let i = 0; i < 16 ; i++){
      this.board[i] = 'assets/img/'+i+'.png';
    }

    this.setB();
    this.pMoves(this.Blank);
    // this.move(15);


    }

}
