import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { TabsPage } from '../tabs/tabs.page';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

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
  noManual: string;
  

  constructor(
      private barcodeScanner: BarcodeScanner,
      private toastCtrl: ToastController,
      private alertCtrl: AlertController,
      private http : HttpService,
      public tabs : TabsPage
  ) { 
    this.noSeries = [];
    this.jsonDataLector = [];
    this.idCard = 0;

    this.letrauno = false;
    this.letrados = false;
    this.letratres = false;
    this.letracuatro = false;
    
    //se manda a llamar el id en caso de que no exista un id se sale de la aplicacion
    //con un mensaje de alerta
    this.id_usuario = parseInt(this.tabs.regresaId());
    console.log(this.id_usuario);
    if (this.id_usuario == NaN) {
      alert("Favor de cerrar sesion y volver a Iniciar");
      navigator['app'].exitApp();
    }
    this.estado = "D";
  }

  ngOnInit() {
  }
//metodo generico para hacer aparecer un toast
  async presentToast(mensaje : string, pos: any, color: string) {
    const toast = await this.toastCtrl.create({
      message : mensaje,
      position : pos,
      duration : 2000,
      color: color
    });
    toast.present();
    
  }

  //la funcion escanearRack valida la cadena y va guardandola en el arreglo noSeries 
  //para su posterior uso
  escanearRack(codigo: string){
    
    

    this.producto = codigo.charAt(0);
    this.proveedor = codigo.charAt(1) + codigo.charAt(2) + codigo.charAt(3)
    +codigo.charAt(4) + codigo.charAt(5) + codigo.charAt(6) + codigo.charAt(7);
    this.anioProduccion = codigo.charAt(8) + codigo.charAt(9);
    this.noSerieProducto = codigo.charAt(10) + codigo.charAt(11) + codigo.charAt(12) +
    codigo.charAt(13) + codigo.charAt(14) + codigo.charAt(15) + codigo.charAt(16) + 
    codigo.charAt(17) + codigo.charAt(18)

    this.idCard = this.idCard + 1;//variable para un id local
    this.noSeries.push({
      id_card: this.idCard , 
      serie: codigo, 
      proveedro: this.proveedor,
      anio: this.anioProduccion,
      seriem: this.noSerieProducto
    })

  }
//llamada al metodo scan de la api BarcodeScanner
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
//para pruebas
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
//borrar arreglos en caso de que se cancele
  borrar(idSerie: number){
    this.noSeries.splice(idSerie,1);
    console.log(this.noSeries);
  }
//se manda a llamar la funcion scan para escanear el codigo del numero de serie
  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        
        this.scannedData = barcodeData.text;
        
        //se guarda la informcacion del scanner en la variable scannedData y se envia  escanearRack

        this.escanearRack(this.scannedData);

        
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

//se vacian las variables del rack y de los numeros de serie
  cancelarChavos(){
    this.noSeries= [];
    this.codigoRack = "";
  }
//se valida el formato del rack axxa (letra, numero, numero y letra)
  guardarChido(){
    // se valida que exista la variable 
    if (!this.codigoRack) {
      this.presentToast("Ingrese un codigo de Rack","bottom", "danger");
      //valida que la longitud no sea menor a 4
    }else if (this.codigoRack.length < 4) {
      this.presentToast("El codigo debe ser de 4 digitos", "bottom", "danger");
      
    }else if (this.codigoRack.length > 4) {
      //valida que la longitud no sea mayor a 4
      this.presentToast("Longitud de codigo de Rack es mayor a 4", "bottom", "danger");
    } else if (this.codigoRack.length==4) {
      //si la longitud de la varible es igual a 4 entra a hacer la validacion
      var str = new String(this.codigoRack);
      var res = str.charAt(0)
      var number = parseInt(res);
      var resd = new String(number);
      
      if 
      //valida que sea una letra
        (resd == "NaN") {
        this.letrauno = true;
        
        var res = str.charAt(1);
        var number = parseInt(res);
        var resd = new String(number);
        //valida que sea un numero
        if (resd != "NaN") {
        var res = str.charAt(2);
        var number = parseInt(res);
        var resd = new String(number);
          //valida que sea un numero
        if (resd != "NaN") {
        var res = str.charAt(3);
        var number = parseInt(res);
        var resd = new String(number);
          //valida que sea una letra
        if (resd == "NaN") {
          console.log(resd);
          console.log("Cuarta bien");
        //al terminar de la validacion procede a la incersion de los datos
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
          
//se hace la modificacion del numero del rack
          this.http.modificarLugardeRack(
            this.noSeries[i].serie,
            this.codigoRack
          ).then((inv)=>{
            console.log(inv);

            
            var respuesta = inv["id_producto"];

            if(respuesta != NaN){
              this.presentToast("Cambio Realizado con exito Correctamente", "middle", "success");
            }else{
              this.presentToast("Error en la Inserción", "middle", "danger");
            }
            
          },(error)=>{
            console.log("Error"+JSON.stringify(error));
          })
//se insertan los cambios
          this.http.insertaraCambios(
            this.noSeries[i].serie,
            "Disponible",
            this.id_usuario
          ).then((inv)=>{
            console.log(inv);

            
          },(error)=>{
            console.log("Error"+JSON.stringify(error));
          })
        }
        this.cancelarChavos();
        
  }
//Se abre una alerta para incluir el nuemro de serie manualmente
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
            //una vez ingresado el nuemro de serie se envia al metodo escanearRack que recibe el no serie
            //this.presentToast(this.estado, 'top', 'primary');
          }
        }
      ]
    });

    await alert.present();
  }

  

 

}
