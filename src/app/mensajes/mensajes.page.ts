import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController, AlertController, NavParams } from '@ionic/angular';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {


  id_usuario:any;
  id_material:any
  mensaje:string;
  task:any;

  constructor(
    public toastController: ToastController, 
    public modalController:ModalController, 
    public alertController:AlertController, 
    public http: HttpService,
    public actRoute: ActivatedRoute
  ) {
      this.id_usuario = 5;
      this.id_material = this.actRoute.snapshot.params['id'];


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
    this.http.enviarMensaje(this.id_conversacion,this.id_material, this.mensaje).then(
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
