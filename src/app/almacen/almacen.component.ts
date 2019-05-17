import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.scss'],
})
export class AlmacenComponent implements OnInit {

  datos:any;

  constructor(
    public toastController: ToastController, 
    public modalController:ModalController, 
    public alertController:AlertController, 
    public http:HttpService) { 

      this.mostrarDatos();
    }

  ngOnInit() {}

  cerrarModal(){
    this.modalController.dismiss();
  }


  mostrarDatos(){

    this.http.mostrarAlmacen().then(
      async (data) => { 
        console.log(data) ; 
  
        this.datos = data;
       
  
  
       
      },
      async (error) =>{
        console.log("Error"+JSON.stringify(error));
       
      }
    );
  }


  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Nuevo Rack',
      inputs: [
        {
          name: 'rack',
          type: 'text',
          placeholder: 'Codigo del Rack'
        },
        {
          name: 'pasillo',
          type: 'text',
          placeholder: 'en que pasillo se encuentra'
        },
        {
          name: 'almacen',
          type: 'text',
          placeholder: 'de cual Almacen?'
        },
        {
          name: 'cantidad',
          type: 'number',
          placeholder: 'Capacidad'
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
            this.agregarRack(data);
            
          }
        }
      ]
    });

    await alert.present();
  }

  result:any;
  agregarRack(data:any){

    this.http.agregarRack(data).then(
      async (data) => { 
        console.log(data); 
        this.result = data;
  
        if(this.result.resultado == "insertado"){

          this.incorrectoToast("El Rack ha sido Registrado Exitosamente");
          this.mostrarDatos();
        }else{

          this.incorrectoToast("RacK duplicado no se realizo el registro");

        }
       
  
  
       
      },
      async (error) =>{
        console.log("Error"+JSON.stringify(error));
       
      }
    );

  }

  async incorrectoToast(tipo:string) {
    const toast = await this.toastController.create({
      message: tipo,
      duration: 2000
    });
    toast.present();
  }

  eliminrItem(rack:any){

    this.http.eliminarAlmacen(rack).then(
      async (data) => { 
        console.log(data); 
        this.result = data;
  
        if(this.result.estado== "eliminado"){

          this.incorrectoToast("El Rack ha sido Eliminado Exitosamente");
          this.mostrarDatos();
        }else{

          this.incorrectoToast("Ocurrio un error en el proceso");

        }
       
  
  
       
      },
      async (error) =>{
        console.log("Error"+JSON.stringify(error));
       
      }
    );

  }

  async presentAlertConfirm(rack:any) {
    const alert = await this.alertController.create({
      header: 'Estas Seguro',
      message: 'Esta accion es irreversible',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Acepto',
          handler: () => {
            console.log('Confirm Okay');
            this.eliminrItem(rack);

          }
        }
      ]
    });

    await alert.present();
  }

}
