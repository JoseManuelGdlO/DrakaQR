import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  ){
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {


        this.id = this.router.getCurrentNavigation().extras.state.id_usuario;
        console.log("ID USUARIO  "+this.id);
      }
    });

  }

  mnss(){
    this.router.navigateByUrl('mensajes');
  }

  public regresaId(){
    return this.id
  }
  
}
