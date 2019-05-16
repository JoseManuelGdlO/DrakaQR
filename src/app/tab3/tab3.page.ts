import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { delay, async } from 'q';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  idCard: number;
  public noSeries: any;
  loadingLogin : boolean;
  estado: string;
  scannedData: string;
  producto: string;
  proveedor: string;
  anioProduccion: string;
  noSerieProducto: string;

  constructor(
    private loadingCtrl: LoadingController,
    private barcodeScanner: BarcodeScanner
  ) { 

    this.idCard = 0;
    this.noSeries = [];
    this.estado = "D";
  }

  ngOnInit() {
  }

  
  borrar(idSerie: number){
    this.noSeries.splice(idSerie,1);
    //delete this.noSeries[1];
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        
        this.scannedData = barcodeData.text;
        
        

        this.escanearRack(this.scannedData);

        
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  escanearRack(codigo: string){
    
    

    this.producto = codigo.charAt(0);
    this.proveedor = codigo.charAt(1) + codigo.charAt(2) + codigo.charAt(3)
    +codigo.charAt(4) + codigo.charAt(5) + codigo.charAt(6) + codigo.charAt(7);
    this.anioProduccion = codigo.charAt(8) + codigo.charAt(9);
    this.noSerieProducto = codigo.charAt(10) + codigo.charAt(11) + codigo.charAt(12) +
    codigo.charAt(13) + codigo.charAt(14) + codigo.charAt(15) + codigo.charAt(16) + 
    codigo.charAt(17) + codigo.charAt(18)

    this.idCard = this.idCard + 1;
    this.noSeries.push({
      id_card: this.idCard , 
      serie: codigo, 
      estado: "Baja",
      proveedro: this.proveedor,
      anio: this.anioProduccion,
      seriem: this.noSerieProducto
    })

  }

  async mostrarLoading(mensaje : string){

    const loading = await this.loadingCtrl.create({
      message: mensaje,
      spinner: "dots"
    });
    
    loading.present();

    if (!this.loadingLogin) {
      await delay(1300);
     await loading.dismiss().then(() => 
      console.log('Adios'));
    }
  }

  async dismiss() {
   this.loadingLogin = false;
    return this.loadingCtrl.dismiss().then(() => 
    console.log('Apagado'));
  }
  
  cancelarChavos(){
    this.noSeries = [];
  }
}
