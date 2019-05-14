import { Component, OnInit } from '@angular/core';

import { ModalController, AlertController, NavController } from '@ionic/angular';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  task:any;

  constructor(public modalController:ModalController, 
    public storage:Storage,
    public alertController:AlertController,
    public navCtrl:NavController
    ) {
      this.refreshData();

      this.task = setInterval(() => {
        this.refreshData();
      }, 30000);
     }
    
     refreshData(){
       console.log("Actualiza");
     }

  ngOnInit() {
  }

  async abrirModalUsuarios(){
    const modal = await this.modalController.create({
      component: UsuariosComponent,
      
    });

    await modal.present();
  }

  

 


}
