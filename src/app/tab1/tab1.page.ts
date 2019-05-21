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
  //metodo generico para hacer aparecer un toast, se le mandan el mensjae, la posicion y la el color
  async presentToast(mensaje : string, pos: any, color: string) {
    const toast = await this.toastCtrl.create({
      message : mensaje,
      position : pos,
      duration : 2000,
      color: color
    });
    toast.present();
    
  }
  
  //se escanea el PRODUCTO (no el rack) y su estado
  escanearRack(codigo: string, estate: any){
    
    var estadou = "Disponible"; // se crea una variable local con un valor predeterminado de disponible

    if (estate == "D") { //si llega D se deja el estado -disponible
      var estadou = "Disponible";
     }else if (estate == "Q") { //si llega D se deja el estado -disponible
      var estadou = "Retenido";
    }else if (estate == "S") { //si llega D se deja el estado -disponible
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
//codigo para pruebas
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
//metodo que borra el card que a la que se le haga el slidding
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
  //se manda a llamar cuando se presiona el boton de guardar
  guardarChido(){
    if (!this.codigoRack) {//se valida que exista la cadena
      this.presentToast("Ingrese un codigo de Rack","bottom", "danger");
    }else if (this.codigoRack.length < 4) {//valida que la longitud no se amenor a 4
      this.presentToast("El codigo debe ser de 4 digitos", "bottom", "danger");
      
    }else if (this.codigoRack.length > 4) {//valida que la longitud no sea mayor a 4
      this.presentToast("Longitud de codigo de Rack es mayor a 4", "bottom", "danger");
    } else if (this.codigoRack.length==4) {// si la longitud es de 4 digitos entra a la siguiente condificon
      var str = new String(this.codigoRack);//se guarda la cadena en una variable
      var res = str.charAt(0)//se selecciona el primer caracter y se guarda en res
      var number = parseInt(res); //se le hace un parseInt para convertir lo que sale en un numero en vez de una cadena
      var resd = new String(number); //se vuelve a convertir el nuemro pero ahora a cadena
      
      //esot arrojara dos posbles resultados de tipo NaN (Not a Number)
      //si el primer caracter de el caracter es un NaN significa que se trata de una letra
      //si la cadena es diferente de NaN entonces el caracter es un numero
      if 
        (resd == "NaN") {//se valida el primer caracter de la cadena
        this.letrauno = true;
        
        var res = str.charAt(1); //se guarda el segundo caracter para repetir la misma operacion
        var number = parseInt(res);
        var resd = new String(number);
        
        if (resd != "NaN") {//validamos el segundo caracter
        var res = str.charAt(2); 
        var number = parseInt(res);
        var resd = new String(number);

        if (resd != "NaN") {//validamos el tercero caracter
        var res = str.charAt(3); 
        var number = parseInt(res);
        var resd = new String(number);

        if (resd == "NaN") {//validamos el cuarto caracter
          console.log(resd);
          console.log("Cuarta bien");
        
        this.juntarArreglo();//una vez validados todos los caracteres se manda a llamar la funcion jutnar arreglo
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
          this.http.insertarProducto(//se inyecta la dependecia
            this.noSeries[i].serie,
            this.codigoRack,
            this.id_usuario,
            this.noSeries[i].estado
          ).then((inv)=>{
            
            console.log(inv);
            var respuesta = inv["id_producto"];// se recive mensaje de bd y se guarda en respuesta
            this.dato = inv["id_producto"];//tambien se guarda en una variable global
            //this.dato = inv;
            //this.id_prod = this.dato.id_producto;
            //console.log("dato" + this.id_prod);
            if(respuesta != NaN){// si la respuesta no es NaN lo que significa que es un numero significa que es correcto
              this.presentToast("Datos Insertados Correctamente", "middle", "success");
            }else{
              this.presentToast("Error en la Inserción", "middle", "danger");// si no se presenta error
            }
          },(error)=>{
            this.presentToast("Error de conexión al servidor", "middle", "danger");// en caso de que falle el internet o la conexion tambien se manda alert
          })
//se hace la insercion en la tabla de cambios
          this.http.insertaraCambios(//se inyecta la dependencia
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
            this.noManual = data.reserva;// se guarda la repsuesta del alerCtrl en una varibale
            this.presentAlertRadioDos(this.noManual);//se manda a llamar funcion presentAlert para elegir el estado del rpoducto
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
            this.escanearRack(noSerie, this.estado);//una bvez obtenido el resultado se sunta en el arreglos
          }
        }
      ]
    });
    await alert.present();
  }

}
