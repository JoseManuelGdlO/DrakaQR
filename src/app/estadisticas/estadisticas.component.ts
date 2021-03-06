import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {

  id_material:any;
  nombre:string;
  task:any;

  constructor(public modalController:ModalController, public navParams:NavParams, public http:HttpService) { 

    this.id_material = this.navParams.get('id_material');
    this.nombre = this.navParams.get('nombre');
//llama a la funcion traerLogs en cuanto se carga la pagina
    this.traerLogs();

  /*  this.task = setInterval(() => {
      this.traerLogs();
      
    }, 10000);*/

  }
//traerlogs carga los ultimos cambios realizados 
  logs:any;
  traerLogs(){

    this.http.traerLogUsuario(this.id_material).then(//se intyecta la dependecia
      async (data) => { //se guarda la informacion en data
        console.log(data) ; 
  
        this.logs = data;//se guarda la informacion en logs
       
      },
      async (error) =>{
        console.log("Error"+JSON.stringify(error));
       
      }
    );

  }

  ngOnInit() {}

//cierra el modal de estadisticas
  cerrarModal(){
    this.modalController.dismiss();
  }

}
