import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from '../../class/empresa';
import { EmpresaService } from '../../service/empresa.service';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent implements OnInit {
  //title:string;
 //private title:string = "Listado de Empresas";
  empresas:Empresa[];

  constructor(private empresaService:EmpresaService,private router:Router) { }

  ngOnInit(): void {

   // this.title ="Listado de Empresas"
    this.obtenerEmpresas();
    
      /*this.empresas = [{
        "id":1,
        "nroRuc":"448878787",
        "razonSocial":"Lima Cargo",
        "estadoEmpresa":"1"

      },
      {
        "id":2,
        "nroRuc":"4545454545",
        "razonSocial":"Lima Este",
        "estadoEmpresa":"1"
      },
      {
        "id":3,
        "nroRuc":"656598989",
        "razonSocial":"Kimberly Clark",
        "estadoEmpresa":"1"
      },
      {
        "id":4,
        "nroRuc":"656598989",
        "razonSocial":"Protect Gamble",
        "estadoEmpresa":"0"
      }
    
    ];*/
  }

  private obtenerEmpresas(){
    this.empresaService.obtenerListaEmpresas().subscribe(dato => {
        this.empresas = dato;
        console.log(this.empresas);
    });
  }

  actualizarEmpresa(id:number){
      this.router.navigate(['actualizar-empresa',id]);
   
    console.log(id);
  }

  eliminarEmpresa(id:number){
    this.empresaService.eliminarEmpresa(id).subscribe(dato =>{
      console.log(dato);
      this.obtenerEmpresas();
    }

    )
  }

 

}
