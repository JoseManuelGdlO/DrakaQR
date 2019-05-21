import { Component, OnInit } from '@angular/core';
import { BarcodeScanResult, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController, AlertController, Platform } from '@ionic/angular';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpService } from '../http.service';
import { LoginPage } from '../login/login.page';
import { TabsPage } from '../tabs/tabs.page';
import { parse } from 'querystring';


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
  id_usuario: number;
  dato: any;
  id_prod: any;
  noManual: string;

  constructor(
      private barcodeScanner: BarcodeScanner,
      private toastCtrl: ToastController,
      private alertCtrl: AlertController,
      private http : HttpService,
      public tabs : TabsPage,
      private platform: Platform
  ) { 
    this.noSeries = [];
    this.jsonDataLector = [];
    this.idCard = 0;

    this.letrauno = false;
    this.letrados = false;
    this.letratres = false;
    this.letracuatro = false;
    
    
    this.id_usuario = parseInt(this.tabs.regresaId());
    console.log(this.id_usuario);
    if (this.id_usuario == NaN) //se verifica si el id esta o no
    {
      alert("Favor de cerrar sesion y volver a Iniciar");
      navigator['app'].exitApp();//en caso de que el id no e encuentre se aparece mensaje de advertencia 
      //y se cierra la aplicacion
    }
    this.estado = "D";// el estado inicial es disponible a menos que se cambie 
  }

  ngOnInit() {
  }
  //metodo generico para hacer aparecer un toast, se le mandan el mensjae, la posicion y la posicion
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
    //se sca el primera valor del codigo S
    this.producto = codigo.charAt(0);
    //Se saca el numero del proveedor
    this.proveedor = codigo.charAt(1) + codigo.charAt(2) + codigo.charAt(3)
    +codigo.charAt(4) + codigo.charAt(5) + codigo.charAt(6) + codigo.charAt(7);
    //se saca el anio de produccion
    this.anioProduccion = codigo.charAt(8) + codigo.charAt(9);
    //se saca el numero de serie del producto
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
//se manda a llamar la api BarcodeScanner para escanear el rack
  scanCodeRack(){
    this.barcodeScanner
      .scan()// en la fucion Scan
      .then(barcodeData => {
        //despues cuando la promesa se cumple arroja informacin tipo barcodeDAta
        //que se guarda en la variable codigoRack
        this.codigoRack = barcodeData.text;
        
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
//para pruebas
  escanearRacktest(){
    this.idCard = this.idCard + 1;
    this.noSeries.push({
      id_card: this.idCard , 
      serie: "005519321", 
      estado: "Disponible",
      proveedro: "3000568",
      anio: "19",
      seriem: "SNAIKI6900123423"
    })
  }
  //S300056819005519321 
//metodo para prueba
  borrar(idSerie: number){
    this.noSeries.splice(idSerie,1);
    console.log(this.noSeries);
  }
// se manda llamar la api BarcodeScanner
  scanCode() {
    this.barcodeScanner
      .scan()//en la funcin scan
      .then(barcodeData => {
        //despues cuando la promesa se cumple arroja informacin tipo barcodeDAta
        //que se guarda en la variable codigoRack
        this.scannedData = barcodeData.text;
        
        

        this.presentAlertRadio();

        
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
//el Alert Radio solicita el estado del producto D= aprobado, Q=Retenido y S=Scrap
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
            //se manda a la funcion de escanear rack el numero del serie completo y el estado
            //this.presentToast(this.estado, 'top', 'primary');
          }
        }
      ]
    });

    await alert.present();
  }
//limpia los arreglos de el numero de serie y del rack
  cancelarChavos(){
    this.noSeries= [];
    this.codigoRack = "";

  }
  //la fucnion escanearRack valida el formato axxa (letra, numero, numero, letra)
  //asi como la longitud minima y maxima de la cadena
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
        
        this.juntarArreglo();
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
  //hace el guardado de la informacion recorriendo los arreglos de los numeros de serie del rack y del rack
  juntarArreglo(){
    
    if (this.id_usuario == NaN) {
      console.log("Error");
    }
    console.log(this.noSeries.length);
        for(var i = 0; i < this.noSeries.length; i++){
          //console.log(this.noSeries[i].serie)
          
//se hace la insercion en la tabla de productos
          this.http.insertarProducto(
            this.noSeries[i].serie,
            this.codigoRack,
            this.id_usuario,
            this.noSeries[i].estado
          ).then((inv)=>{
            
            console.log(inv);
            var respuesta = inv["id_producto"];
            this.dato = inv["id_producto"];
            //this.dato = inv;
            //this.id_prod = this.dato.id_producto;
            //console.log("dato" + this.id_prod);
            if(respuesta != NaN){
              this.presentToast("Datos Insertados Correctamente", "middle", "success");
            }else{
              this.presentToast("Error en la Inserción", "middle", "danger");
            }
          },(error)=>{
            this.presentToast("Error de conexión al servidor", "middle", "danger");
          })
//se hace la insercion en la tabla de cambios
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

  

 //pide el numero de serie manualmente
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
            this.presentAlertRadioDos(this.noManual);
            console.log(this.noManual);
            //this.presentToast(this.estado, 'top', 'primary');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertRadioDos(noSerie : string) {
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
            console.log(this.estado);
            this.escanearRack(noSerie, this.estado);
          }
        }
      ]
    });
    await alert.present();
  }

}
