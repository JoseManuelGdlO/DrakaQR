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


}
