import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import  { HttpClient }  from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import {GlobalService} from '../../services/global.service';
import { Base64 } from '@ionic-native/base64/ngx';




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


  constructor(public base64: Base64,public globalService: GlobalService,public loadingController:LoadingController, public keyboard: Keyboard, public httpClientModule: HttpClient) { }
  closeKeyboard(){
  this.keyboard.hide();
  }
  
   ngOnInit() {
  
 
 this.toDataURL(
  'assets/image/imageToSave.png', (function
  (dataUrl){
  var ret = dataUrl.replace("data:image/png;base64,",'');
    this.globalService.imagy=ret;
    this.jsonData=JSON.stringify({image: this.globalService.imagy});
    this.presentLoading();
  }).bind(this),''
)





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
 });
}
 
 async presentLoading() {
  	
    const loading = await this.loadingController.create({
      message: 'Loading Data',
      duration: 11000
    });
    await loading.present();
	this.startHTTP();
    const { role, data } = await loading.onDidDismiss();
    this.isLoading=true;
    var myElement = document.querySelectorAll('*[id]');
	this.fill_board(this.response);
	
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
	var cell = document.getElementById('cell-'+(j+9*i));
	if(board[i][j]==0)
	cell["value"]=null;
	else
	cell["value"]=board[i][j];
	}
	

}

}
 
