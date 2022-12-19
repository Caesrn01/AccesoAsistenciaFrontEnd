import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2'
import { Observable, throwError } from 'rxjs';
import { Empleado } from '../class/empleado';
import { catchError, map } from 'rxjs/operators';
import { TipoEmpleado } from '../class/tipo-empleado';


@Injectable({
  providedIn: 'root'
})


export class EmpleadoService {
  constructor(private httpClient : HttpClient, private router: Router,
              private authService: AuthService) { }


  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  private baseUrl = "http://localhost:8090/api/empleado";

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

   /* if (e.status == 403) {
     Swal.fire({icon: 'error', title: 'Acceso Denegado', text: `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`}) 
     this.router.navigate(['/clientes']);
      return true;
    }*/
    return false;
  }


  obtenerListaEmpleados():Observable<Empleado[]>
  {
    return this.httpClient.get<Empleado[]>(`${this.baseUrl}`);
  }
  obtenerListaTipoEmpleados():Observable<TipoEmpleado[]>
  {
    return this.httpClient.get<TipoEmpleado[]>(`${this.baseUrl}/tipoEmpleados`);
  }
  
  obtenerEmpleadoPorId(id:number):Observable<Empleado>{
      return this.httpClient.get<Empleado>(`${this.baseUrl}/${id}`, {headers: this.agregarAuthorizationHeader()} ).pipe(
        catchError(e => {

          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }

          this.router.navigate(["/empleado/listar"]);
          console.error(e.error.mensaje);
          Swal.fire({icon: 'error', title: 'Error al editar', text: e.error.mensaje })
          return throwError(e);
          
        }

        )
    );
  }

  registrarEmpleado(empleado:Empleado):Observable<Empleado>{
   // return this.httpClient.post(`${this.baseUrl}`, empresa,{ headers: this.httpHeaders }).pipe(
    return this.httpClient.post(`${this.baseUrl}`, empleado,{ headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.empleado as Empleado),
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




  actualizarEmpleado(empleado:Empleado): Observable<any>{
    //return this.httpClient.put(`${this.baseUrl}/${empresa.id}`, empresa,{ headers: this.httpHeaders }).pipe(
      return this.httpClient.put(`${this.baseUrl}/${empleado.id}`, empleado,{ headers: this.agregarAuthorizationHeader() }).pipe(
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

  eliminarEmpleado(id:number): Observable<any>{
    //return this.httpClient.delete<Empresa>(`${this.baseUrl}/${id}`,{ headers: this.httpHeaders }).pipe(
    return this.httpClient.delete<Empleado>(`${this.baseUrl}/${id}`,{ headers: this.agregarAuthorizationHeader() }).pipe(
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


  desactivarEmpleado(id:number): Observable<any>{
    //return this.httpClient.delete<Empresa>(`${this.baseUrl}/${id}`,{ headers: this.httpHeaders }).pipe(
     return this.httpClient.put(`${this.baseUrl}/inactivo/${id}`,{ headers: this.agregarAuthorizationHeader() }).pipe(
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

