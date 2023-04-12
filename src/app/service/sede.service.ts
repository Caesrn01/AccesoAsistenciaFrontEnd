
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators' 
import { Sede } from '../class/sede';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
//import { AnyARecord, AnyRecord } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class SedeService {


  constructor(private httpClient : HttpClient, private router: Router,
              private authService: AuthService) { }


  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  private baseUrl = "http://localhost:9000/api/sede";

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean {
    if (e.status == 401) {

      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status == 403) {
     // swal('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      Swal.fire({icon: 'error', title: 'Acceso Denegado', text: `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`}) 
      this.router.navigate(['/sedes']);
        return true;
    }
    return false;
  }

  /*
  public isNoAutorizado(e):boolean{
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }
*/



  
/*
  obtenerListaEmpresas():Observable<Empresa[]>
  {
    return this.httpClient.get<Empresa[]>(`${this.baseUrl}`, {headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e);
        this.isNoAutorizado(e);
        return throwError(e);

      })
    );
  }*/

  obtenerListaSedes():Observable<Sede[]>
  {
    return this.httpClient.get<Sede[]>(`${this.baseUrl}`);
  }
  
  obtenerSedePorId(id:number):Observable<Sede>{
    return this.httpClient.get<Sede>(`${this.baseUrl}/${id}`, {headers: this.agregarAuthorizationHeader()} ).pipe(
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          this.router.navigate(["/sedes/listar"]);
          return throwError(e);
        }

        this.router.navigate(["/sedes/listar"]);
        console.error(e.error.mensaje);
        Swal.fire({icon: 'error', title: 'Error al editar', text: e.error.mensaje })
        return throwError(e);
        
      }

      )
    );
  }

  
  registrarSede(sede:Sede):Observable<Sede>{
   // return this.httpClient.post(`${this.baseUrl}`, empresa,{ headers: this.httpHeaders }).pipe(
    return this.httpClient.post(`${this.baseUrl}`, sede,{ headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.sede as Sede),
      catchError(e => {

          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }

          if (e.status == 400) {
            return throwError(e);
          }

          console.error(e.error.mensaje);
          Swal.fire({icon: 'error', title: e.error.mensaje, text: e.error.error })
          return throwError(e);
        }
      )
    )

  }




  actualizarSede(sede:Sede): Observable<any>{
    //return this.httpClient.put(`${this.baseUrl}/${empresa.id}`, empresa,{ headers: this.httpHeaders }).pipe(
      return this.httpClient.put(`${this.baseUrl}/${sede.idSede}`, sede,{ headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

          if (e.status == 400) {
            return throwError(e);
          }

          console.error(e.error.mensaje);         
          Swal.fire({icon: 'error', title: e.error.mensaje, text: e.error.error })
          return throwError(e);
      })
    );   
  }

 
  eliminarSede(id:number): Observable<any>{
    //return this.httpClient.delete<Empresa>(`${this.baseUrl}/${id}`,{ headers: this.httpHeaders }).pipe(
      return this.httpClient.delete<Sede>(`${this.baseUrl}/${id}`,{ headers: this.agregarAuthorizationHeader() }).pipe(
      
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire({icon: 'error', title: e.error.mensaje, text: e.error.error})
        return throwError(e);
      })
    );
  }




}
