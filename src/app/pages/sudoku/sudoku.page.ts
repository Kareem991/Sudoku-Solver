import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import  { HttpClient }  from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import {GlobalService} from '../../services/global.service';
import { Base64 } from '@ionic-native/base64/ngx';
import {LoadingService} from '../../services/loading.service';




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


  constructor(public loading: LoadingService,public base64: Base64,public globalService: GlobalService, public keyboard: Keyboard, public httpClientModule: HttpClient) { }
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
 this.httpClientModule.post("https://sudoku-asu.herokuapp.com/image",this.jsonData,httpOptions)
 .subscribe(data=>{
 this.response=data;
 this.loading.dismiss();
 this.fill_board(this.response);
 },
 error => this.loading.dismiss());
}
 
 
  toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
 
  img.onload = () => {
    var canvas : any = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
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


}
 
