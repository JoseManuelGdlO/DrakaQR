import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-chatadmin',
  templateUrl: './chatadmin.component.html',
  styleUrls: ['./chatadmin.component.scss'],
})
export class ChatadminComponent implements OnInit {

  constructor(
    public toastController: ToastController, 
    public modalController:ModalController, 
    public alertController:AlertController, 
    public http:HttpService) { }

  ngOnInit() {}

  cerrarModal(){
    this.modalController.dismiss();
  }

}
