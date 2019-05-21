import { Component, OnInit } from '@angular/core';

import { ModalController, AlertController, NavController } from '@ionic/angular';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AlmacenComponent } from '../almacen/almacen.component';
import { ChatadminComponent } from '../chatadmin/chatadmin.component';
import { HttpService } from '../http.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  task:any;
  noticias:string;
  estado:string;
  nombre:string;
  id:any;
  rack:string;
  codigoRack:string;
  codigoProducto:string;

  constructor(public modalController:ModalController, 
    public storage:Storage,
    public alertController:AlertController,
    public navCtrl:NavController,
    private route: ActivatedRoute,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    public http: HttpService
    ) {
//obtiene el id del usuario que se envia desde el login
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {


          this.id = this.router.getCurrentNavigation().extras.state.id_usuario;
          console.log("ID USUARIO  "+this.id);
        }
      });

      
//refresaca la informacion
      this.refreshData();

      this.task = setInterval(() => {
        this.refreshData();
        
      }, 10000);
     }
    
     id_material:any
     resultadoUltimoCambio:any;

     refreshData(){
      // console.log("Actualiza");

       this.http.mostrarUtlimoCambio().then(//inyecta el servicio
        async (data) => { //la informacion recibida se guarda en data
          //console.log(data); 

          
          this.resultadoUltimoCambio = data;// se guarda data en una variable tipo any
          //para acceder a los valores que se regresane en el json

          this.noticias = this.resultadoUltimoCambio.movimiento;
          this.estado = this.resultadoUltimoCambio.estatus;
          this.nombre = this.resultadoUltimoCambio.nombre;
          this.rack = this.resultadoUltimoCambio.no_rack;
          this.id_material = this.resultadoUltimoCambio.id
         
    
    
         
        },
        async (error) =>{
          console.log("Error"+JSON.stringify(error));
         
        }
      );
     }

  ngOnInit() {
  }
 //abre la pagina para poder visualizar los usuarios

  async abrirModalUsuarios(){
   
    const modal = await this.modalController.create({
      component: UsuariosComponent,
      componentProps: { 
        id_usuario: this.id
      }      
    });

    await modal.present();
  }
//navega a la pagina de almacen
  async abrirModalAlmacen(){
    const modal = await this.modalController.create({
      component: AlmacenComponent,
      
    });

    await modal.present();
  }
//abre la pagina de los chats
  async abrirModalChat(){
    const modal = await this.modalController.create({
      component: ChatadminComponent,
      
    });

    await modal.present();
  }

//metodo para cerrar sesion
  cerrarSesion(){

    this.storage.set('USER', ''); //se vacia el capo USER del stroage del telefono
    this.storage.set('CONTRA', '');// se vacia el campo CONTRA del storage del telefono

    this.router.navigate(['']); //se navega hacia el login

  }
//metodo para escanear el codigo de rack usando la api BarcodeScanner
  scanCodeRack(){
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        //baarcodeData devuelve un array con dos valores el primero es el texto leido y el segundo el tipo de codgio leido
        this.codigoRack = barcodeData.text;//se guarda el valor del codgio leido
        
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

//se manda a buscar el rack y devuelve el almacen, pasillo y rack o error en caso de que no lo encuentre
  buscarRack(){

    this.http.buscaRack(this.codigoRack).then(//se manda el codigo del rack para la busqueda
      async (data) => { //la informacion devuelta en la promesa se guarda en array data
        

        if(data ==  null){//se valida si llego algo en el arreglo o no
          this.presentError();//en caso de que no se encuentre el rack manda error

        }else{// en caso de que si devuelva algo...
          this.presentRack(data['almacen'],data['pasillo'], data['rack']);//se manda a llamar el toast con los valores
        }
       
        


  
  
       
      },
      async (error) =>{
        console.log("Error"+JSON.stringify(error));
       
      }
    );

  }

//aler que se manda llamar cuanto se encuentra la posicion del objeto
  async presentRack(almacen:string, pasillo:string, rack:string) {
    const alert = await this.alertController.create({
      header: 'Posicion',
      subHeader: 'Rack '+rack,
      message: 'Se encuentra en el Almacen '+almacen+' en el pasillo '+pasillo,
      buttons: ['OK']
    });

    await alert.present();
  }
//alert para presentar error en caso de que no se encuentre el elemento
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

    this.http.buscaProd(this.codigoProducto).then(// se manda a llamar el service buscaProd
      async (data) => { //se guarda la informacion obtenida en data
        console.log(data); 
       
        
        if(data ==  null){//se valida si el arreglo data llega vacio o no
          this.presentError();// se manda error en casod e que el arrelgo sea null

        }else{
//en caso de que si tenga algo el arreglo se manda a llamar el toast
        this.presentProd(data['almacen'],data['pasillo'], data['rack'], data['serie']);
        }
  
       
      },
      async (error) =>{
        console.log("Error"+JSON.stringify(error));
       
      }
    );

  }
//toast para localizar el priduco
  async presentProd(almacen:string, pasillo:string, rack:string, serie:string) {
    const alert = await this.alertController.create({
      header: 'Posicion',
      subHeader: 'Producto '+serie,
      message: 'Se encuentra en el Almacen '+almacen+' en el pasillo '+pasillo+' en el Rack '+rack,
      buttons: ['OK']//el toast no se esconde hasta que se toque el boton ok
    });

    await alert.present();
  }
//abre el chat mandando el id del trbajador
  async mandarChat(){
     
      const modal = await this.modalController.create({
        component: ChatadminComponent,
        componentProps: { 
          id_admin: this.id,
          id_material: this.id_material
        }      
        
      });
  
      await modal.present();
    
  }


  

 


}
