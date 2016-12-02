
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  status: string;
  msg: string;
  count: number;
  turn: string;
  board: string[];

  constructor(public navCtrl: NavController) {
    this.buildBoard();
  }

  check(player: string) {

    // H check --1
    for (let i = 0; i < 6; i += 3) {
      if (player == this.board[i] && player == this.board[i + 1] && player == this.board[i + 2])
        this.status = player;
    }
    // V check  --2

    for (let i = 0; i < 3; i++) {
      if (player == this.board[i] && player == this.board[i + 3] && player == this.board[i + 6])
        this.status = player;
    }

    // X check --3
    if (player == this.board[0] && player == this.board[4] && player == this.board[8])
      this.status = player;

    if (player == this.board[2] && player == this.board[4] && player == this.board[6])
      this.status = player;

     this.count++;
    // check Status --4
    if (this.status == "X") {
      this.msg = 'X wins!'
    } else if (this.status == "O") {
      this.msg = 'O wins!'
    } else if (this.count >= 9) {
      this.msg = 'Tie Game!';
      this.status = "T";
    }
  }

  play(box) {
   
    if (this.board[box] == '' && this.status == 'run') {
      this.board[box] = this.turn;
     
      this.check(this.turn);
      if (this.status == 'run')
        this.flipTrue();
    }
  }

  buildBoard() {
    this.count = 0;
    this.board = [];
    this.turn = "X";
    this.status = 'run';
    this.msg = "player X's trun";
    for (let i = 0; i < 9; i++) {
      this.board.push('');
    }
  }

  flipTrue() {
    this.turn = this.turn == 'X' ? 'O' : 'X';
    this.msg = this.turn == 'X' ? "player X's trun" : "player O's trun"
  }
}
