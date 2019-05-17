import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { EstadisticasComponent } from '../estadisticas/estadisticas.component';
import { HttpService } from '../http.service';
import { ToastController } from '@ionic/angular';
import { ChatadminComponent } from '../chatadmin/chatadmin.component';




@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {

 
  ide_llego:string;
  usuarios:any;

  constructor(public navParams:NavParams, public toastController: ToastController, public modalController:ModalController, public alertController:AlertController, public http:HttpService) {

    console.log(this.navParams.get('id_usuario'));
    this.ide_llego = this.navParams.get('id_usuario');
    this.mostrarUsuarios();
  

   }

  ngOnInit() {}

  mostrarUsuarios(){

    this.http.mostrar().then(
      async (data) => { 
        console.log(data) ; 
  
        this.usuarios = data;
       
  
  
       
      },
      async (error) =>{
        console.log("Error"+JSON.stringify(error));
       
      }
    );
  }

  cerrarModal(){
    this.modalController.dismiss();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Nuevo Usuario',
      inputs: [
        {
          name: 'nombreCompleto',
          type: 'text',
          placeholder: 'Nombre Completo'
        },
        {
          name: 'usuario',
          type: 'text',
          placeholder: 'Nombre de Usuario'
        },
        {
          name: 'contra',
          type: 'text',
          placeholder: 'Escribe la contraseña'
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
          handler: data => {
            console.log(JSON.stringify(data)); //to see the object
            
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPromptModificar(id:string, nombre:string, usuario:string, contra:string) {
    const alert = await this.alertController.create({
      header: 'Nuevo Usuario',
      inputs: [
        {
          name: 'nombreCompleto',
          value: nombre,
          type: 'text',
          placeholder: 'Nombre Completo'
        },
        {
          name: 'usuario',
          value: usuario,
          type: 'text',
          placeholder: 'Nombre de Usuario'
        },
        {
          name: 'contra',
          value: contra,
          type: 'text',
          placeholder: 'Escribe la contraseña'
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
          handler: data => {

            this.actualizarUsuario(data,id);
            //console.log(JSON.stringify(data)); //to see the object
            
          }
        }
      ]
    });

    await alert.present();
  }

  actualizarUsuario(data:any,id:string){
    console.log(data);
    console.log(id);

    this.http.actualizarUsuario(data,id).then(
      async (data) => { 
        console.log(data) ; 
  
        
        this.mostrarUsuarios();
  
        this.presentToast("Usuario Modificado de manera Exitosa");
  
       
      },
      async (error) =>{
        console.log("Error"+JSON.stringify(error));
        this.presentToast("Ocurrio un error modificando el usuario revisa tu conexion a internet");
      }
    );


  }

  async eliminar(id:string){
    const alert = await this.alertController.create({
      header: '¿Estas Seguro?',
      message: 'Se eliminaran todas las estadisticas de este usuario',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {

            this.http.eliminarUsuario(id).then(
              async (data) => { 
                console.log(data) ; 
          
                
                this.mostrarUsuarios();
          
                this.presentToast("Usuario Eliminado de manera Exitosa");
          
               
              },
              async (error) =>{
                console.log("Error"+JSON.stringify(error));
                this.presentToast("Ocurrio un error eliminando el usuario revisa tu conexion a internet");
              }
            );
            
          }
        }
      ]
    });

    await alert.present();

  }

  async estadisticas(id:any,nombre:string){
    const modal = await this.modalController.create({
      component: EstadisticasComponent,
      componentProps: { 
        id_material: id,
        nombre:nombre
      }  
      
    });

    await modal.present();
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async mensajeModal(id_materia:string){
    const modal = await this.modalController.create({
      component: ChatadminComponent,
      componentProps: { 
        id_admin: this.ide_llego,
        id_material: id_materia
      }      
      
    });

    await modal.present();
  }


}
