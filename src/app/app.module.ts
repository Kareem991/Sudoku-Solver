import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { HttpClientModule } from '@angular/common/http';
import { Base64 } from '@ionic-native/base64/ngx';
import {GlobalService} from './services/global.service';
import {LoadingService} from './services/loading.service';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,],
  providers: [
  ImageResizer, 
  LoadingService,
  GlobalService,
  Base64,
    HttpClientModule,
    Keyboard,
  	Camera,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
