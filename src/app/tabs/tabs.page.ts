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
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {


        this.id = this.router.getCurrentNavigation().extras.state.id_usuario;
        console.log("ID USUARIO  "+this.id);
      }
    });
  }

  mnss(){
    this.router.navigateByUrl('mensajes/'+this.id);
    
  }

  public regresaId(){
    return this.id
  }
  
  async salir(){
    
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
            this.storage.set('USER', '');
            this.storage.set('CONTRA', '');
            this.router.navigateByUrl('');
          }
        }
      ]
    });

    await alert.present();
  }

}
