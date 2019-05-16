import { Component, OnInit } from '@angular/core';
import { BarcodeScanResult, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController, AlertController } from '@ionic/angular';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public noSeries: any;
  idCard: number;
  scannedData: string;
  codigoRack: string;
  letrauno: boolean;
  letrados: boolean;
  letratres: boolean;
  letracuatro: boolean;
  estado: string;
  jsonDataLector: any;
  codigo: string;
  producto: string;
  proveedor: string;
  anioProduccion: string;
  noSerieProducto: string;
  arreglodeRack = [];
  

  constructor(
      private barcodeScanner: BarcodeScanner,
      private toastCtrl: ToastController,
      private alertCtrl: AlertController,
      private http : HttpService
  ) { 
    this.noSeries = [];
    this.jsonDataLector = [];
    this.idCard = 0;

    this.letrauno = false;
    this.letrados = false;
    this.letratres = false;
    this.letracuatro = false;
    

    this.estado = "D";
  }

  ngOnInit() {
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

  escanearRack(codigo: string, estate: any){
    
    var estadou = "Disponible";

    if (estate == "D") {
      var estadou = "Disponible";
    }else if (estate == "Q") {
      var estadou = "Retenido";
    }else if (estate == "S") {
      var estadou = "Scrap";
    }

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
      estado: estadou,
      proveedro: this.proveedor,
      anio: this.anioProduccion,
      seriem: this.noSerieProducto
    })

  }

  scanCodeRack(){
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        
        this.codigoRack = barcodeData.text;
        
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  escanearRacktest(){
    this.idCard = this.idCard + 1;
    this.noSeries.push({
      id_card: this.idCard , 
      serie: "12131412", 
      estado: "Pasado",
      proveedro: "NAIKI",
      anio: "2069",
      seriem: "SNAIKI6900123423"
    })
  }

  borrar(idSerie: number){
    this.noSeries.splice(idSerie,1);
    console.log(this.noSeries);
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        
        this.scannedData = barcodeData.text;
        
        

        this.presentAlertRadio();

        
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  async presentAlertRadio() {
    const alert = await this.alertCtrl.create({
      header: 'Estado del Producto',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Aprobado',
          value: 'D',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Detenido',
          value: 'Q'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Scrap',
          value: 'S'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Agregar',
          handler: (data:string) => {
            this.estado = data;
            this.escanearRack(this.scannedData, this.estado);
            //this.presentToast(this.estado, 'top', 'primary');
          }
        }
      ]
    });

    await alert.present();
  }

  cancelarChavos(){
    this.noSeries= [];
    this.codigoRack = "";

  }
  guardarChido(){
    if (!this.codigoRack) {
      this.presentToast("Ingrese un codigo de Rack","bottom", "danger");
    }else if (this.codigoRack.length < 4) {
      this.presentToast("El codigo debe ser de 4 digitos", "bottom", "danger");
      
    }else if (this.codigoRack.length > 4) {
      this.presentToast("Longitud de codigo de Rack es mayor a 4", "bottom", "danger");
    } else if (this.codigoRack.length==4) {
      var str = new String(this.codigoRack);
      var res = str.charAt(0)
      var number = parseInt(res);
      var resd = new String(number);
      
      if 
        (resd == "NaN") {
        this.letrauno = true;
        
        var res = str.charAt(1);
        var number = parseInt(res);
        var resd = new String(number);
        
        if (resd != "NaN") {
        var res = str.charAt(2);
        var number = parseInt(res);
        var resd = new String(number);

        if (resd != "NaN") {
        var res = str.charAt(3);
        var number = parseInt(res);
        var resd = new String(number);

        if (resd == "NaN") {
          console.log(resd);
          console.log("Cuarta bien");
        this.presentToast("Codigo Correcto","top","primary");
        this.insertarProducto();
        //to go code
        }else{
          this.presentToast("Verifique cuarta letra de código","bottom","danger");
        }

        }else{
          this.presentToast("Verifique tercera letra de código","bottom","danger");
        }
        }else{
          this.presentToast("Verifique segunda letra de código","bottom","danger");
        }
      }else{
        this.presentToast("Verifique primera letra de código", "bottom", "danger")
      }
      
      
    }

  }
  
  juntarArreglo(){
    
        for(var i = 0; i < this.noSeries.length; i++){
          //console.log(this.noSeries[i].serie)

          this.http.insertarProducto(
            this.noSeries[i].serie,
            this.codigoRack,
            4,
            this.noSeries[i].estado
          ).then((inv)=>{
            console.log(inv);
          },(error)=>{
            console.log("Error"+JSON.stringify(error));
          })
        }
        
  }

  insertarProducto(){
    
  }

}
