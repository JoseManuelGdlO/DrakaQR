import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController, AlertController, NavParams } from '@ionic/angular';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-chatadmin',
  templateUrl: './chatadmin.component.html',
  styleUrls: ['./chatadmin.component.scss'],
})
export class ChatadminComponent implements OnInit {


  id_usuario:any;
  id_material:any
  mensaje:string;
  task:any;

  constructor(
    public toastController: ToastController, 
    public modalController:ModalController, 
    public alertController:AlertController, 
    public http:HttpService,
    public navParams:NavParams) { 

      this.id_usuario = this.navParams.get('id_admin');
      this.id_material = this.navParams.get('id_material');


      this.crearConversacion();
      this.traerConversacion();

      this.task = setInterval(() => {
        this.traerConversacion();
        
      }, 10000);
    }

    respuestaid_conver:any
    crearConversacion(){

      this.http.crearConversacion(this.id_usuario,this.id_material).then(
        async (data) => { 
          console.log(data);
          
          this.respuestaid_conver = data;
          this.id_conversacion = this.respuestaid_conver.id_conversacion;
          
    
         
         
        },
        async (error) =>{
          console.log("Error"+JSON.stringify(error));
         
        }
      );
    }

  ngOnInit() {}

  cerrarModal(){
    this.modalController.dismiss();
  }

  datos:any;
  id_conversacion:any;
  traerConversacion(){
    this.http.mostrarConversacion(this.id_usuario,this.id_material).then(
      async (data) => { 
       // console.log(data) ; 
  
        this.datos = data;
       
      },
      async (error) =>{
        console.log("Error"+JSON.stringify(error));
       
      }
    );
  }

 respuestaEnvio:any;
  enviarMensaje(){
    this.http.enviarMensaje(this.id_conversacion,this.id_usuario, this.mensaje).then(
      async (data) => { 
        console.log(data) ; 
  
        this.respuestaEnvio = data;

        this.traerConversacion();
       this.mensaje="";
  
  
       
      },
      async (error) =>{
        console.log("Error"+JSON.stringify(error));
       
      }
    );
  }

}
