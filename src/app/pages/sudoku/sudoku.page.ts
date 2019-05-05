import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import  { HttpClient }  from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import {GlobalService} from '../../services/global.service';
import { Base64 } from '@ionic-native/base64/ngx';
import {LoadingService} from '../../services/loading.service';
import { AlertController } from '@ionic/angular';




@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.page.html',
  styleUrls: ['./sudoku.page.scss'],
})
export class SudokuPage implements OnInit {
isLoading = false;
response: any;
jsonData: any;
images: any;
imagy:any;


  constructor(public alertController: AlertController,public loading: LoadingService,public base64: Base64,public globalService: GlobalService, public keyboard: Keyboard, public httpClientModule: HttpClient) { }
  closeKeyboard(){
  this.keyboard.hide();
  }
  
   ngOnInit() {
 
    this.jsonData=JSON.stringify({image: this.globalService.imagy});
     this.loading.present();
     this.startHTTP();
  }
startHTTP(){

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token',
    
  })
};
 this.httpClientModule.post("http://sudoku-asu.herokuapp.com/image",this.jsonData,httpOptions)
 .subscribe(data=>{
 this.response=data;
 this.loading.dismiss();
 this.fill_board(this.response);
 },
 error => this.loading.dismiss());
}
 
 
fill_board(response){
var i,j ;
	var board = response['board']
	for(i=0;i<9;i++)
	for(j=0;j<9;j++){
	var cell = <HTMLInputElement> document.getElementById('cell-'+(j+9*i));
	if(board[i][j]==0)
	cell["value"]=null;
	else{
	cell["value"]=board[i][j];
	cell.disabled=true;}
	}
	

}
resulting(){
  var result_button = document.getElementById("but1");
  if(result_button.innerHTML=="Show Results"){
  this.show_results();
  result_button.innerHTML="Hide Results"
  }
  else{
  this.hide_results();
  result_button.innerHTML="Show Results"
  }
}
show_results(){
  var i,j ;
	var results = this.response['solution'];
	for(i=0;i<9;i++)
	for(j=0;j<9;j++){
	var cell = <HTMLInputElement> document.getElementById('cell-'+(j+9*i));
	cell.style.backgroundColor = 'white';
	cell["value"]=results[i][j];
	}
}
hide_results(){
this.fill_board(this.response);
}
validate_answer(){
  var i,j ;
	var results = this.response['solution'];
	var false_flag=false;
	for(i=0;i<9;i++)
	for(j=0;j<9;j++){
	var cell = <HTMLInputElement> document.getElementById('cell-'+(j+9*i));
	if(cell["value"] != results[i][j])
	var false_flag=true;
	}
	if(false_flag){
  this.presentWrongAlert();
	console.log('wrong answer!');
  }
	else{
  this.presentCorrectAlert()
	console.log('correct answer!')
}
}
validate_move(mycell){
var cell = mycell.target.id;
mycell.target.style.backgroundColor = 'white';
if(mycell.target.value==''){
return;
}
var wrong = false;
var i,j;
var id=cell.substr(5,6);
var Id = Number(id);
var row= Math.trunc(Id/9);
var column=(Id%9);
var squareCol=Math.trunc(column/3);
var squareRow=Math.trunc(row/3);
for(i=0;i<9;i++){
var neighbor_cell=<HTMLInputElement> document.getElementById('cell-'+(column+9*i));
if(neighbor_cell.value==mycell.target.value && neighbor_cell.id != mycell.target.id)
wrong=true;
}
for(j=0;j<9;j++){
var neighbor_cell=<HTMLInputElement> document.getElementById('cell-'+(j+9*row));
if(neighbor_cell.value==mycell.target.value && neighbor_cell.id != mycell.target.id)
wrong=true;
}
var squareRowBegin=squareRow*3;
var squareRowEnd=squareRow*3+3;
var squareColBegin=squareCol*3;
var squareColEnd=squareCol*3+3;
for(i=squareColBegin;i<squareColEnd;i++)
for(j=squareRowBegin;j<squareRowEnd;j++){
var neighbor_cell=<HTMLInputElement> document.getElementById('cell-'+(i+9*j));
if(neighbor_cell.value==mycell.target.value && neighbor_cell.id != mycell.target.id)
wrong=true;
}
if(wrong){
	mycell.target.style.backgroundColor = 'red';
}
}
async presentCorrectAlert() {
    const alert = await this.alertController.create({
      header: 'Validation',
      cssClass: 'successAlert',
      message: '<p>Correct answer!</p>',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentWrongAlert() {
    const alert = await this.alertController.create({
      header: 'Validation',
      cssClass: 'failureAlert',
      message: 'Wrong answer',
      buttons: ['OK']
    });

    await alert.present();
  }
}
 
