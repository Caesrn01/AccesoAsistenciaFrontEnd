import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from '../../class/empresa';
import { EmpresaService } from '../../service/empresa.service';
import Swal from 'sweetalert2';
import { identifierModuleUrl } from '@angular/compiler';
import { identity } from 'rxjs';


@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent implements OnInit {
  //title:string;
 //private title:string = "Listado de Empresas";
  empresas:Empresa[];
  totalEmpresas:number=0;

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
        this.totalEmpresas = this.empresas.length;
        console.log(this.empresas);
    });
  }

  actualizarEmpresa(id:number){
      this.router.navigate(['actualizar-empresa',id]);
   
    console.log(id);
  }

  //eliminarEmpresa(id:number){
    eliminarEmpresa(empresa:Empresa){
   /* this.empresaService.eliminarEmpresa(id).subscribe(dato =>{
      console.log(dato);
      this.obtenerEmpresas();
    }

    )*/
        Swal.fire({
          title: 'Esta seguro?',
          text: `Esta seguro que desea eliminar a la empresa con RazonSocial  ${empresa.razonSocial} `,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.empresaService.eliminarEmpresa(empresa.id).subscribe(
              () => {
                    this.empresas = this.empresas.filter(emp => emp !== empresa)
                    Swal.fire('Empresa Eliminado!',`Empresa <b> ${empresa.razonSocial} </b> eliminado con exito`,'success')
              }
            )
          }
       }) 
        
    }

  }






 






  