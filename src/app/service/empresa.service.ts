import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../class/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private httpClient : HttpClient) { }

  private baseUrl = "http://localhost:8090/api/empresa";

  obtenerListaEmpresas():Observable<Empresa[]>
  {
    return this.httpClient.get<Empresa[]>(`${this.baseUrl}`);
  }
  obtenerEmpresaPorId(id:number){
    return this.httpClient.get<Empresa>(`${this.baseUrl}/${id}`)
  }

  registrarEmpresa(empresa:Empresa):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`, empresa);
  }
  actualizarEmpresa(id:number,empresa:Empresa){
    return this.httpClient.put(`${this.baseUrl}/${id}`, empresa);
  }
  eliminarEmpresa(id:number){
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }


}
