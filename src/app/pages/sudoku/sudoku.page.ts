import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import  { HttpClient }  from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.page.html',
  styleUrls: ['./sudoku.page.scss'],
})
export class SudokuPage implements OnInit {
isLoading = false;
response: string;

  constructor(public loadingController:LoadingController, public keyboard: Keyboard, public httpClientModule: HttpClient) { }
  closeKeyboard(){
  this.keyboard.hide();
  }
   ngOnInit() {
this.presentLoading();

 
  }
startHTTP(){
 this.httpClientModule.get("https://sugoku.herokuapp.com/board?difficulty=easy")
 .subscribe(data=>{
 this.response=data["board"];
 });
 


  
}
 
 async presentLoading() {
  	
    const loading = await this.loadingController.create({
      message: 'Loading Data',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.startHTTP();
    var myElement = document.getElementsByTagName("input");
 console.log(myElement);
    this.isLoading=true;
  
  }

}
 
