import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';


import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../app/http.service';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlmacenComponent } from './almacen/almacen.component';
import { ChatadminComponent } from './chatadmin/chatadmin.component';

@NgModule({
  declarations: [AppComponent, UsuariosComponent, EstadisticasComponent, AlmacenComponent, ChatadminComponent],
  entryComponents: [
    UsuariosComponent,
    EstadisticasComponent,
    AlmacenComponent,
    ChatadminComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    BarcodeScanner,
    HttpService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
