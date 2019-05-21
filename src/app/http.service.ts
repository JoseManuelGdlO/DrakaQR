import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  inicioURL:string = "http://draka.avisositd.xyz/"; //url del host laravel

  constructor(public http: HttpClient) { }


  //metodo get para enviar la informacion del usuario y la contraseña
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

  //metodo para mostrar todos los usuarios
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
//metodo para mostrar el almacen
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

//se carga la conversacion dependiendo de los usarios que la soliciten
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
//metodo get para acutalizar informacion de usuario
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

//metodo para agregar un rack a la base de datos
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

//fucnion para elimiar usuario ya registrado

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

//metodo para mostrar el ultimo cambio
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
//se inserta producto en la base de datos
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

//se hace al mismo momento la insercion del producto

insertaraCambios(id_producto: string, moviemiento: string, id_usuario: number){
  var url = this.inicioURL+'insertarCambios/'+ id_producto+ '/' + moviemiento + '/' + id_usuario;
  console.log(url);
  console.log("Desde provider 1:"+ id_producto);
  console.log("Desde provider 1:" + moviemiento);
  console.log("Desde provider 1:" + id_usuario);
  return new Promise((resolve, reject) => {
   this.http.get(url)
      .subscribe(data => {
        resolve(data);
       }, (err) =>{
         reject(err);    
       });
  });
}
//se modifica el lugar del rack
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
//modificar el estatus del producto
modificarStatusProducto(id_producto: string, status: string){
  var url = this.inicioURL+'modificarEstatusProducto/'+ id_producto+ '/' + status;
  return new Promise((resolve, reject) => {
   this.http.get(url)
      .subscribe(data => {
        resolve(data);
       }, (err) =>{
         reject(err);    
       });
  });
}

//enviar mensajes 
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

//crear la conversacion
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

//traer la tala de registros por trabajador
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

//busca el rack
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

//busca el producto
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


//elimina un almacen
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

//agrega un usuario
agregarUsuario(data){

  var url = this.inicioURL+'insertarUsuario/'+data.nombreCompleto+'/'+data.usuario+'/'+data.contra+'/2';
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


}
