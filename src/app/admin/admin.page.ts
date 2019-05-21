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

       this.http.mostrarUtlimoCambio().then(
        async (data) => { 
          //console.log(data); 

          
          this.resultadoUltimoCambio = data;

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

    this.storage.set('USER', '');
    this.storage.set('CONTRA', '');

    this.router.navigate(['']);

  }
//metodo para escanear el codigo de rack usando la api BarcodeScanner
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

//se manda a buscar el rack y devuelve el almacen, pasillo y rack o error en caso de que no lo encuentre
  buscarRack(){

    this.http.buscaRack(this.codigoRack).then(
      async (data) => { 
        console.log(data); 

        if(data ==  null){
          this.presentError();

        }else{
          this.presentRack(data['almacen'],data['pasillo'], data['rack']);
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
