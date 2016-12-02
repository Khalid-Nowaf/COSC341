import { Component} from '@angular/core';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tipIn: number; // tip input
  tipOut:string; // tip output
  amountIn:string; // amount input
  totalOut:string; // total output
  isD:boolean;
  constructor() {
  this.tipIn = 15; // defualt value
  this.tipOut = '0.00' ;  // defualt value
  this.totalOut = '0.00';  // defualt value
  this.amountIn = '0'; // defualt value
  this.isD = false;

  }

add(num:string) {

  if((num == '.' && this.amountIn.substr(-1) == '.') ||
     (num == '0' && this.amountIn == '0'))
  return;

  if(this.amountIn == '0' && num != '.')
  this.amountIn = num;
  else
  this.amountIn += num;

  if( num == '.')
   this.isD = true;

  this.calc();
}


remove() {
  if(this.amountIn == '')
   this.clear();
if(this.amountIn.substr(-1)  == '.')
 this.isD = false;
this.amountIn = this.amountIn.slice(0,-1);

this.calc();
 if(this.amountIn == '')
 this.clear();
}

clear(){
    this.amountIn = '0';
    this.tipIn = 15;
    this.totalOut = '0.00';
    this.tipOut = '0.00';
}
calc(){
  if(this.amountIn == '0')
  return;
  if(this.amountIn.substring(0,-1) == '.' )
  this.amountIn += '00'; // add missing zeros
  let amount = Number(this.amountIn); // cast string to number
  let total = (Number(amount) * (this.tipIn/ 100 )) + Number(amount); // get the total
  this.totalOut = total.toFixed(2); // f.2
  this.tipOut =   (total - amount).toFixed(2); // f.2

}

}
