import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { EstadisticasComponent } from '../estadisticas/estadisticas.component';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {

  constructor(public modalController:ModalController, public alertController:AlertController) { }

  ngOnInit() {}

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

  async presentAlertPromptModificar(/*nombre:string, usuario:string, contra:string*/) {
    const alert = await this.alertController.create({
      header: 'Nuevo Usuario',
      inputs: [
        {
          name: 'nombreCompleto',
         // value: nombre,
          type: 'text',
          placeholder: 'Nombre Completo'
        },
        {
          name: 'usuario',
          //value: usuario,
          type: 'text',
          placeholder: 'Nombre de Usuario'
        },
        {
          name: 'contra',
          //value: contra,
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

  async eliminar(){
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
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();

  }

  async estadisticas(){
    const modal = await this.modalController.create({
      component: EstadisticasComponent,
      
    });

    await modal.present();
  }


}
