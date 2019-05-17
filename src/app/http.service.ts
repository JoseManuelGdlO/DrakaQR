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
insertarProducto(serie: string, noRack: string, idUsuario: number, status: string){
  var url = this.inicioURL+'insertarProducto/'+ serie+ '/' + noRack + '/' + idUsuario + '/' + status;
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


insertaraCambios(id_producto: string, moviemiento: string, id_usuario: number){
  var url = this.inicioURL+'insertarCambios/'+ id_producto+ '/' + moviemiento + '/' + id_usuario;
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

modificarLugardeRack(id_producto: string, noRack: string){
  var url = this.inicioURL+'modificarPosicionProducto/'+ id_producto+ '/' + noRack;
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


buscaRack(codigoRack:string){
  var url = this.inicioURL+'buscarRack/'+codigoRack;
  return new Promise((resolve, reject) => {
   this.http.get(url)
      .subscribe(data => {
        resolve(data);
       }, (err) =>{
         reject(err);    
       });
  });

}

buscaProd(serie:string){
  var url = this.inicioURL+'mostrarUbicacionProducto/'+serie;
  return new Promise((resolve, reject) => {
   this.http.get(url)
      .subscribe(data => {
        resolve(data);
       }, (err) =>{
         reject(err);    
       });
  });

}

eliminarAlmacen(rack:any){
  var url = this.inicioURL+'eliminarAlmacen/'+rack;
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
