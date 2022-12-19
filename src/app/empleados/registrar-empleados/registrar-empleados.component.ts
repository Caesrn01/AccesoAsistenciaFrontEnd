import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/class/empleado';
import { TipoEmpleado } from 'src/app/class/tipo-empleado';
import { EmpleadoService } from 'src/app/service/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-empleados',
  templateUrl: './registrar-empleados.component.html',
  styleUrls: ['./registrar-empleados.component.css']
})
export class RegistrarEmpleadosComponent implements OnInit {

  empleado: Empleado = new Empleado();
  titulo: string = "Crear Empleado";
  totErrores:number = 0;
   tipoEmpleados:TipoEmpleado[];
   totalTipoEmpleados:number = 0;

  errores: string[];

 constructor(private empleadoService:EmpleadoService, private router:Router,
             private activatedRoute: ActivatedRoute
   ) { }

 ngOnInit(): void {
//console.log(this.empleado.id);

   this.activatedRoute.paramMap.subscribe(params => {
     let id = params.get('id');
     if (id) {
       this.empleadoService.obtenerEmpleadoPorId(parseInt(id)).subscribe((empleado) => this.empleado = empleado);
     }
   });

 }

 private obtenerTipoEmpleado(){
  this.empleadoService.obtenerListaTipoEmpleados().subscribe(dato => {
      this.tipoEmpleados = dato;
      this.totalTipoEmpleados = this.tipoEmpleados.length;
      console.log(this.tipoEmpleados);
  });
}

 guardarEmpleado() {
  
  

  console.log(this.empleado);
  this.empleado.estado = true;
  this.empleado.empresa.id =2;
  this.RetornarListaEmpleados();
  Swal.fire('Nuevo Empleado', `El empleado<b> ${this.empleado.nombre} </b> ha sido creado con éxito`, 'success' )
  this.router.navigate(['/empleados/listar']);
  /*
  this.empleadoService.registrarEmpleado(this.empleado).subscribe(empleado => {
           console.log(empleado);
               
          Swal.fire('Nuevo Empleado', `El empleado<b> ${this.empleado.nombre} </b> ha sido creado con éxito`, 'success' )
       },
       err => {
               this.errores = err.error.errors as string[];
              // this.totErrores = this.errores.length;
              this.totErrores = 3;
               console.error('Código del error desde el backend: ' + err.status);
               console.error(err.error.errors);
                
       }
       
   );*/
 }
 
 goToListaEmpleados(){
   this.router.navigate(['/empleados/listar']);
 }


 RetornarListaEmpleados(){
   this.router.navigate(['/empleados/listar']);
   //swal('Empleado actualizado',`El empleado ${this.empleado.nombre} ha sido actualizado con exito`,`success`);
 }

 actualizarEmpleado2(){
  this.RetornarListaEmpleados();
  Swal.fire('Empleado actualizada', `Los datos del empleado <b> ${this.empleado.nombre} </b>  han sido actualizados con éxito `, 'success' )
 }

 actualizarEmpleado(){
      this.empleadoService.actualizarEmpleado(this.empleado).subscribe(empleado => {    
          this.RetornarListaEmpleados();
          Swal.fire('Empleado actualizada', 'Se actualizaron los datos con éxito', 'success' )
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

