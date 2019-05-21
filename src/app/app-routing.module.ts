import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*{ path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'informacion', loadChildren: './informacion/informacion.module#InformacionPageModule' },
  */

  {
    path: '',// se inicia la sesion en '', que carga el login
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'app',//ruta para las tabs
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  {
     path: 'admin', // ruta para la parte del administrador
     loadChildren: './admin/admin.module#AdminPageModule' 
  },
  { 
     path: 'mensajes/:id', //ruta para los mensajes
     loadChildren: './mensajes/mensajes.module#MensajesPageModule' 
  }
  
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
