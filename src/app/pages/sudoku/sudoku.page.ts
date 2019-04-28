import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import  { HttpClient }  from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import {GlobalService} from '../../services/global.service';




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


  constructor(public globalService: GlobalService,public loadingController:LoadingController, public keyboard: Keyboard, public httpClientModule: HttpClient) { }
  closeKeyboard(){
  this.keyboard.hide();
  }
  
   ngOnInit() {

 this.toDataURL(
  'assets/image/icon.png',
  (dataUrl) => {
    this.globalService.imagy=dataUrl;
    this.jsonData=JSON.stringify({image: this.globalService.imagy});
    this.presentLoading();
  }
)



  }
startHTTP(){

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token',
    
  })
};

 this.httpClientModule.post("http://127.0.0.1:5000/image",this.jsonData,httpOptions)
 .subscribe(data=>{
 this.response=data.image;
 console.log(this.response)});
}
 
 async presentLoading() {
  	
    const loading = await this.loadingController.create({
      message: 'Loading Data',
      duration: 3000
    });
    await loading.present();
    console.log(myElement);
    this.isLoading=true;
	this.startHTTP();
    const { role, data } = await loading.onDidDismiss();
    var myElement = document.getElementsByTagName("input");
this.images = this.response;
  }

 
  toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}
  

}
 
