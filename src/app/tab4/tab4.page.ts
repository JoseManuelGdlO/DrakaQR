import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { TabsPage } from '../tabs/tabs.page';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  id_usuario:any;
  codigoProducto:string;

  constructor(public http:HttpService, public tabs: TabsPage,
    public alertController: AlertController,
    public barcodeScanner : BarcodeScanner,
    private router: Router) { 
// se manda a llamar la fucion regresaId de la clase tabs.ts que regresa un entero con el valor e la id
    this.id_usuario = parseInt(this.tabs.regresaId());
    this.traerLogs();
  }

  ngOnInit() {
  }
  async presentError() {
    const alert = await this.alertController.create({
      header: 'Posicion',
      subHeader: 'ERROR',
      message: 'No se encuentra el elemento que buscas',
      buttons: ['OK']
    });

    await alert.present();
  }

  scanCodeProd(){
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        
        this.codigoProducto = barcodeData.text;
        
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  buscarProd(){

    this.http.buscaProd(this.codigoProducto).then(
      async (data) => { 
        console.log(data); 
       
        
        if(data ==  null){
          this.presentError();

        }else{

        this.presentProd(data['almacen'],data['pasillo'], data['rack'], data['serie']);
        }
  
       
      },
      async (error) =>{
        console.log("Error"+JSON.stringify(error));
       
      }
    );

  }

  async presentProd(almacen:string, pasillo:string, rack:string, serie:string) {
    const alert = await this.alertController.create({
      header: 'Posicion',
      subHeader: 'Producto '+serie,
      message: 'Se encuentra en el Almacen '+almacen+' en el pasillo '+pasillo+' en el Rack '+rack,
      buttons: ['OK']
    });

    await alert.present();
  }
  mnss(){
    this.router.navigateByUrl('mensajes/'+this.id_usuario);
  }

  logs:any;
  traerLogs(){

    this.http.traerLogUsuario(this.id_usuario).then(
      async (data) => { 
        console.log(data) ; 
  
        this.logs = data;
       
      },
      async (error) =>{
        console.log("Error"+JSON.stringify(error));
       
      }
    );

  }

}
