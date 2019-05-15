import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:string;
  contra:string;
  colorUsuario:any;
  colorContra:any;

  check:boolean;

  constructor(public toastController:ToastController, public storage:Storage ,public http:HttpService, public loadingCtrl:LoadingController) {

    var usuarioLlegada;
    var contraLlegada;

    storage.get('USER').then((val) => {
      if(val != null){
        usuarioLlegada = val;
      }
    });
    storage.get('CONTRA').then((val) => {
      if(val != null){
        contraLlegada = val;
        this.login(usuarioLlegada, contraLlegada);
      }
    });

    

   }


  ngOnInit() {


  }

  iniciarSesion(){

    if(this.check == true){
       // set a key/value
      this.storage.set('USER', this.usuario);
      this.storage.set('CONTRA', this.contra);

    }
    
  
    if(this.usuario != undefined){
      this.colorUsuario = "primary";

        if(this.contra != undefined){
          this.colorContra = "primary";
          this.login(this.usuario, this.contra);

        }else{
          this.presentToast("Contraseña");
          this.colorContra = "danger";
        }

    }else{
      this.presentToast("Usuario");
      this.colorUsuario ="danger";
    }

  }

  result:any;
  async login(usuario:string, contra:string){

    const loading = await this.loadingCtrl.create({
      message: 'Iniciando Sesion...',
      duration: 2000
    });
    await loading.present();

    this.http.login(this.usuario,this.contra).then(
      async (data) => { 
        console.log(data);
  
       await loading.onDidDismiss();

       this.result =data;

       if(this.result.id == 0){
        this.incorrectoToast("El usuario y la contraseña es incorrecto");
       }else{
        this.incorrectoToast("Bienvenido");


       }
  
  
       
      },
      async (error) =>{
        console.log("Error"+JSON.stringify(error));
        await loading.onDidDismiss();
      }
    );
  }

  async presentToast(tipo:string) {
    const toast = await this.toastController.create({
      message: 'El campo '+tipo+'  esta vacio',
      duration: 2000
    });
    toast.present();
  }

  async incorrectoToast(tipo:string) {
    const toast = await this.toastController.create({
      message: tipo,
      duration: 2000
    });
    toast.present();
  }

}
