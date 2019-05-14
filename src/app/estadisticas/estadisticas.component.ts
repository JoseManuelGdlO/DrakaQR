import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {}

  cerrarModal(){
    this.modalController.dismiss();
  }

}
