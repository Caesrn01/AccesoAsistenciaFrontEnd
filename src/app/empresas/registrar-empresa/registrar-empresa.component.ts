import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/class/empresa';
import { EmpresaService } from 'src/app/service/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-empresa',
  templateUrl: './registrar-empresa.component.html',
  styleUrls: ['./registrar-empresa.component.css']
})
export class RegistrarEmpresaComponent implements OnInit {

  // empresa:Empresa = new Empresa();


   empresa: Empresa = new Empresa();
   titulo: string = "Crear Empresa";
   totErrores:number = 0;
 
   errores: string[];

  constructor(private empresaService:EmpresaService, private router:Router,
              private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
  /*  this.id = this.activatedRoute.snapshot.params['id'];
    this.empresaService.obtenerEmpresaPorId(this.id).subscribe(dato =>{
      this.empresa = dato;
    } ,error => console.log(error));
*/

    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        this.empresaService.obtenerEmpresaPorId(parseInt(id)).subscribe((empresa) => this.empresa = empresa);
      }
    });

  }

  /*onSubmit(){
   
    this.guardarEmpresa();
  }*/

  guardarEmpresa() {
    this.empresaService.registrarEmpresa(this.empresa).subscribe(empresa => {
            console.log(empresa);
             Swal.fire('Nueva Empresa', `La empresa <b> ${this.empresa.razonSocial} </b> ha sido creado con éxito`, 'success' )
            this.RetornarListaEmpresas();
           // swal('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito`, 'success');
           
        },
        err => {
                this.errores = err.error.errors as string[];
                this.totErrores = this.errores.length;
                console.error('Código del error desde el backend: ' + err.status);
                console.error(err.error.errors);
                 
        }
        
    );
  }
  
  goToListaEmpresas(){
    this.router.navigate(['/empresas/listar-empresas']);
  }


  RetornarListaEmpresas(){
    this.router.navigate(['/empresas/listar-empresas']);
    //swal('Empleado actualizado',`El empleado ${this.empleado.nombre} ha sido actualizado con exito`,`success`);
  }

  actualizarEmpresa(){
    this.empresaService.actualizarEmpresa(this.empresa).subscribe(empresa => {    

        this.RetornarListaEmpresas();
        Swal.fire('Empresa actualizada', 'Se actualizaron los datos con éxito', 'success' )
    },
    err => {
        this.errores = err.error.errors as string[];
        this.totErrores = this.errores.length;
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
    
    }

  );
 }






}
