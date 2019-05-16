import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { delay, async } from 'q';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  idCard: number;
  public noSeries: any;
  loadingLogin : boolean;
  estado: string;

  constructor(
    private loadingCtrl: LoadingController
  ) { 

    this.idCard = 0;
    this.noSeries = [];
    this.estado = "D";
  }

  ngOnInit() {
  }

  escanearRack(codigo: any){
    this.idCard = this.idCard + 1;
    this.noSeries.push({
      id_card: this.idCard , serie: 1231, estado: this.estado
    })
  }
  borrar(idSerie: number){
    this.noSeries.splice(idSerie,1);
    //delete this.noSeries[1];
  }

  guardarChido(){
      console.log(this.noSeries);
  }

  async mostrarLoading(mensaje : string){

    const loading = await this.loadingCtrl.create({
      message: mensaje,
      spinner: "dots"
    });
    
    loading.present();

    if (!this.loadingLogin) {
      await delay(1300);
     await loading.dismiss().then(() => 
      console.log('Adios'));
    }
  }

  async dismiss() {
   this.loadingLogin = false;
    return this.loadingCtrl.dismiss().then(() => 
    console.log('Apagado'));
  }
  

}
