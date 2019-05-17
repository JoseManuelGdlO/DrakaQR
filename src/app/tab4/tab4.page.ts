import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  id_usuario:any;

  constructor(public http:HttpService, public tabs: TabsPage) { 

    this.id_usuario = parseInt(this.tabs.regresaId());
    this.traerLogs();
  }

  ngOnInit() {
  }

  logs:any;
  traerLogs(){

    this.http.traerLogUsuario(this.id_usuario).then(
      async (data) => { 
        console.log(data) ; 
  
        this.logs = data;
       
      },
      async (error) =>{
        console.log("Error"+JSON.stringify(error));
       
      }
    );

  }

}
