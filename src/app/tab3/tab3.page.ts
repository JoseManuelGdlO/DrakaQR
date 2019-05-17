import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { delay, async } from 'q';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { TabsPage } from '../tabs/tabs.page';
import { HttpService } from '../http.service';

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
  id_usuario: number;
  noManual: string;

  constructor(
    private loadingCtrl: LoadingController,
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    public tabs : TabsPage,
    private http : HttpService,
    private alertCtrl : AlertController
  ) { 

    this.idCard = 0;
    this.noSeries = [];
    this.estado = "D";
    this.id_usuario = parseInt(this.tabs.regresaId());
    console.log(this.id_usuario);
    if (this.id_usuario == NaN) {
      alert("Favor de cerrar sesion y volver a Iniciar");
      navigator['app'].exitApp();
    }
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
      estado: "Scrap",
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

  
  
  juntarArreglo(){
    
    if (this.id_usuario == NaN) {
      console.log("Error");
    }
    console.log(this.noSeries.length);
        for(var i = 0; i < this.noSeries.length; i++){
          //console.log(this.noSeries[i].serie)
          

          this.http.modificarStatusProducto(
            this.noSeries[i].serie,
            "Baja"
          ).then((inv)=>{
            
            console.log(inv);
            var respuesta = inv["id_producto"];

            if(respuesta != NaN){
              this.presentToast("Datos Insertados Correctamente", "middle", "success");
            }else{
              this.presentToast("Error en la Inserción", "middle", "danger");
            }
          },(error)=>{
            this.presentToast("Error de conexión al servidor", "middle", "danger");
          })

          this.http.insertaraCambios(
            this.noSeries[i].serie,
            this.noSeries[i].estado,
            this.id_usuario
          ).then((inv)=>{
      
            console.log(inv);
      
          },(error)=>{
            console.log("Error"+JSON.stringify(error));
          })
          
        }
        this.cancelarChavos();
        
  }

  async presentToast(mensaje : string, pos: any, color: string) {
    const toast = await this.toastCtrl.create({
      message : mensaje,
      position : pos,
      duration : 2000,
      color: color
    });
    toast.present();
    
  }

  async abrirAlerta(){
    const alert = await this.alertCtrl.create({
      header: 'Ingrese Numero de Serie a 19 digitos',
      inputs: [
        {
          name: 'reserva',
          type: 'text',
          placeholder: 'Código'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Ok',
          handler: data => {
            this.noManual = data.reserva;
            this.escanearRack(this.noManual);
            console.log(this.noManual);
            //this.presentToast(this.estado, 'top', 'primary');
          }
        }
      ]
    });

    await alert.present();
  }

}
