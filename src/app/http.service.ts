import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { }

  login(usuario:string, contra:string){
 
    //alert(usuario+contra);
   
   var url = 'http://192.168.0.15/laravel_apps/Draka/public/login/'+usuario+'/'+contra;
   return new Promise((resolve, reject) => {
    this.http.get(url)
       .subscribe(data => {
         resolve(data);
        }, (err) =>{
          reject(err);    
        });
   });
  }

  mostrar(){
 
    //alert(usuario+contra);
   
   var url = 'http://192.168.0.15:80/laravel_apps/Draka/public/usuarios';
   return new Promise((resolve, reject) => {
    this.http.get(url)
       .subscribe(data => {
         resolve(data);
        }, (err) =>{
          reject(err);    
        });
   });
  }

actualizarUsuario(data:any, id:string){

  var url = 'http://192.168.0.15/laravel_apps/Draka/public/actualizarUsuario/'+data.nombreCompleto+'/'+data.usuario+'/'+data.contra+'/2/'+id;
  return new Promise((resolve, reject) => {
   this.http.get(url)
      .subscribe(data => {
        resolve(data);
       }, (err) =>{
         reject(err);    
       });
  });

}

eliminarUsuario(id:string){

  var url = 'http://192.168.0.15/laravel_apps/Draka/public/eliminarUsuario/'+id;
  return new Promise((resolve, reject) => {
   this.http.get(url)
      .subscribe(data => {
        resolve(data);
       }, (err) =>{
         reject(err);    
       });
  });

}

}
