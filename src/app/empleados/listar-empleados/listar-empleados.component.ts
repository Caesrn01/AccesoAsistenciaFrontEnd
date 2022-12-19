import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/service/empleado.service';
import Swal from 'sweetalert2';
import {Empleado} from '../../class/empleado';

@Component({
  selector: 'app-listar-empleados',
  templateUrl: './listar-empleados.component.html',
  styleUrls: ['./listar-empleados.component.css']
})
export class ListarEmpleadosComponent implements OnInit {

  empleados:Empleado[];
  totalEmpleados:number=0;

  constructor(private empleadoService:EmpleadoService,private router:Router) { }

  ngOnInit(): void {

   // this.title ="Listado de Empresas"
    this.obtenerEmpleados();
    
   
  }

  private obtenerEmpleados(){
    this.empleadoService.obtenerListaEmpleados().subscribe(dato => {
        this.empleados = dato;
        this.totalEmpleados = this.empleados.length;
        console.log(this.empleados);
    });
  }

 
  
  eliminarEmpleado(empleado:Empleado){
       Swal.fire({
          title: 'Esta seguro?',
          text: `Esta seguro que desea eliminar al empleado ${empleado.nombre} `,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
          if (result.isConfirmed) {      
                this.empleadoService.eliminarEmpleado(empleado.id).subscribe(
                  () => {
                        this.empleados = this.empleados.filter(emp => emp !== empleado)
                        Swal.fire('Registro Eliminado!',`Empleado <b> ${empleado.nombre} </b> eliminado con exito`,'success')
                  }
                )
          }
       }) 
        
    }




    desactivarEmpleado(id:number,nombre:String){
   
      Swal.fire({
        title: 'Esta seguro?',
        text: `Esta seguro que desea que desea inactivar al empleado ${nombre} `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, inactivar!'
      }).then((result) => {
        if (result.isConfirmed) {
            this.empleadoService.desactivarEmpleado(id).subscribe(
              () => {
                  // this.empleados = this.empleados.filter(emp => emp !== empleado)
                  this.obtenerEmpleados();
                    Swal.fire('Registro Inactivo!',`Empleado <b> ${nombre} </b> inactivado con exito`,'success')
              }
            )
          
        }



        }
     ) 
      
  }


}
