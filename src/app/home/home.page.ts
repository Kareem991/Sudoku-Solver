import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavController } from '@ionic/angular';
import {GlobalService} from '../services/global.service';



@Component({
  selector: 'app-home.page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
	currentImage: any;

  	constructor(public navCtrl:NavController, private camera: Camera,public globalService: GlobalService) {
}
 ngOnInit() {
 
  this.toDataURL(
  'assets/image/imageToSave.png', (function
  (dataUrl){
  this.currentImage=dataUrl;
  var res = dataUrl.replace('data:image/png;base64,','');
    this.globalService.imagy=res;
  }).bind(this),''
)
  }

takePicture() {
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 800,
      targetWidth: 2000
      
      
    }

    this.camera.getPicture(options).then((imageData) => {
    this.globalService.imagy = imageData;
      this.currentImage = 'data:image/png;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log("Camera issue:" + err);
    });
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
 
}
