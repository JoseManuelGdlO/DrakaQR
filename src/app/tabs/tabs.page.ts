import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage{

  id: any;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public alertCtrl: AlertController,
    public storage:Storage
  ){
    this.route.queryParams.subscribe(params => {//manda a llamar el queryParams para obtner la informacion que viene desde el login
      if (this.router.getCurrentNavigation().extras.state) {


        this.id = this.router.getCurrentNavigation().extras.state.id_usuario;// se guarda el id en la variable global id
        console.log("ID USUARIO  "+this.id);
      }
    });
    if (this.id == NaN) {//en caso de que exista un error se manda mensaje 
      alert("Favor de cerrar sesion y volver a Iniciar");
      navigator['app'].exitApp();//se cierra la aplicacion
    }
  }

  // la funcion mnss(mensaje) navega hacia la pagina de mensajes mandando el id
  mnss(){
    this.router.navigateByUrl('mensajes/'+this.id);
  }

  //este metodo regresa el id del usuario obtenido desde el login
  public regresaId(){
    return this.id
  }
  //el metodo para cerrar sesion
  async salir(){
    //se abre un alert
    const alert = await this.alertCtrl.create({
      header: 'Porfavor confirme!',
      message: 'Cerrar Sesion',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Salir',
          handler: () => {
            //en caso de que el usuario desee salir se vacian la informacion en el storage
            this.storage.set('USER', '');
            this.storage.set('CONTRA', '');
            this.router.navigateByUrl(''); //se navega hacia el login con ' '
          }
        }
      ]
    });

    await alert.present();//se manda a llamar el alert
  }

}
