import { Component, OnInit } from '@angular/core';

import { ModalController, AlertController, NavController } from '@ionic/angular';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AlmacenComponent } from '../almacen/almacen.component';
import { ChatadminComponent } from '../chatadmin/chatadmin.component';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  task:any;
  noticias:string;
  id:any;

  constructor(public modalController:ModalController, 
    public storage:Storage,
    public alertController:AlertController,
    public navCtrl:NavController,
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpService
    ) {

      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {


          this.id = this.router.getCurrentNavigation().extras.state.id_usuario;
          console.log("ID USUARIO  "+this.id);
        }
      });

      

      this.refreshData();

      this.task = setInterval(() => {
        this.refreshData();
        
      }, 10000);
     }
    

     resultadoUltimoCambio:any;
     refreshData(){
      // console.log("Actualiza");

       this.http.mostrarUtlimoCambio().then(
        async (data) => { 
          //console.log(data); 
          
          this.resultadoUltimoCambio = data;

          this.noticias = this.resultadoUltimoCambio.movimiento;
         
    
    
         
        },
        async (error) =>{
          console.log("Error"+JSON.stringify(error));
         
        }
      );
     }

  ngOnInit() {
  }

  async abrirModalUsuarios(){
    const modal = await this.modalController.create({
      component: UsuariosComponent,
      
    });

    await modal.present();
  }

  async abrirModalAlmacen(){
    const modal = await this.modalController.create({
      component: AlmacenComponent,
      
    });

    await modal.present();
  }

  async abrirModalChat(){
    const modal = await this.modalController.create({
      component: ChatadminComponent,
      
    });

    await modal.present();
  }


  cerrarSesion(){

    this.storage.set('USER', '');
    this.storage.set('CONTRA', '');

    this.router.navigate(['login']);

  }

  

 


}
