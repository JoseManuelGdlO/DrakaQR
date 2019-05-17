import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  inicioURL:string = "http://draka.avisositd.xyz/";

  constructor(public http: HttpClient) { }

  login(usuario:string, contra:string){
 
    //alert(usuario+contra);
   
   var url = this.inicioURL+'login/'+usuario+'/'+contra;
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
   
   var url = this.inicioURL+'usuarios';
   return new Promise((resolve, reject) => {
    this.http.get(url)
       .subscribe(data => {
         resolve(data);
        }, (err) =>{
          reject(err);    
        });
   });
  }

  mostrarAlmacen(){
 
    //alert(usuario+contra);
   
   var url = this.inicioURL+'mostrarAlmacen';
   return new Promise((resolve, reject) => {
    this.http.get(url)
       .subscribe(data => {
         resolve(data);
        }, (err) =>{
          reject(err);    
        });
   });
  }


  mostrarConversacion(uno:string,dos:string){
 
    //alert(usuario+contra);
   
   var url = this.inicioURL+'verMensajes/'+uno+'/'+dos;
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

  var url = this.inicioURL+'actualizarUsuario/'+data.nombreCompleto+'/'+data.usuario+'/'+data.contra+'/2/'+id;
  return new Promise((resolve, reject) => {
   this.http.get(url)
      .subscribe(data => {
        resolve(data);
       }, (err) =>{
         reject(err);    
       });
  });

}

agregarRack(data:any){

  var url = this.inicioURL+'insertarAlmacen/'+data.almacen+'/'+data.rack+'/'+data.pasillo+'/'+data.cantidad
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

  var url = this.inicioURL+'eliminarUsuario/'+id;
  return new Promise((resolve, reject) => {
   this.http.get(url)
      .subscribe(data => {
        resolve(data);
       }, (err) =>{
         reject(err);    
       });
  });

}

mostrarUtlimoCambio(){
  var url = this.inicioURL+'mostrarUltimoCambio';
  return new Promise((resolve, reject) => {
   this.http.get(url)
      .subscribe(data => {
        resolve(data);
       }, (err) =>{
         reject(err);    
       });
  });
}

enviarMensaje(id_conversacion:string,id_usuario:string, mensaje:string){

  var url = this.inicioURL+'insertarMensaje/'+id_conversacion+'/'+id_usuario+'/'+mensaje;
  console.log(url);
  return new Promise((resolve, reject) => {
   this.http.get(url)
      .subscribe(data => {
        resolve(data);
       }, (err) =>{
         reject(err);    
       });
  });
}

crearConversacion(id_usuario_uno,id_material){
  var url = this.inicioURL+'insertarConversacion/'+id_usuario_uno+'/'+id_material;
  return new Promise((resolve, reject) => {
   this.http.get(url)
      .subscribe(data => {
        resolve(data);
       }, (err) =>{
         reject(err);    
       });
  });
}


traerLogUsuario(id:any){
  var url = this.inicioURL+'mostrarCambioID/'+id;
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
