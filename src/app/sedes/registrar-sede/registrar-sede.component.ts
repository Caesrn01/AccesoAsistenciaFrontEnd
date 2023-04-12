import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sede } from 'src/app/class/sede';
import { SedeService } from 'src/app/service/sede.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-sede',
  templateUrl: './registrar-sede.component.html',
  styleUrls: ['./registrar-sede.component.css']
})
export class RegistrarSedeComponent implements OnInit {


  sede: Sede = new Sede();
  titulo: string = "Crear Sede";
  totErrores:number = 0;

  errores: string[];

 constructor(private sedeService:SedeService, private router:Router,
             private activatedRoute: ActivatedRoute
   ) { }

 ngOnInit(): void {
 
 
   this.activatedRoute.paramMap.subscribe(params => {
     let id = params.get('id');
     if (id) {
       this.sedeService.obtenerSedePorId(parseInt(id)).subscribe((sede) => this.sede = sede);
     }
 
   });


    if (typeof  this.sede.estado === 'undefined') {
        this.sede.estado = "A";
        console.log(this.sede.estado);
      }

 }

 

 guardarSede() {
   this.sede.userCreacion = sessionStorage.getItem('username');
   this.sede.idGrupo = parseInt(sessionStorage.getItem('idGrupo'));
   
   this.sedeService.registrarSede(this.sede).subscribe(sede => {
           console.log(sede);
            Swal.fire('Nueva Sede', `La sede <b> ${this.sede.nombreSede} </b> ha sido creado con éxito`, 'success' )
           this.RetornarListaSedes();
          
       },
       err => {
               this.errores = err.error.errors as string[];
               this.totErrores = this.errores.length;
               console.error('Código del error desde el backend: ' + err.status);
               console.error(err.error.errors);
                
       }
       
   );
 }
 
 goToListaSedes(){
   this.router.navigate(['/sedes/listar']);
 }


 RetornarListaSedes(){
   this.router.navigate(['/sedes/listar']);
 }

 actualizarSede(){
 
   this.sede.userActualizacion = sessionStorage.getItem('username');

   this.sedeService.actualizarSede(this.sede).subscribe(empresa => {    

       this.RetornarListaSedes();
       Swal.fire('Sede actualizada', 'Se actualizaron los datos con éxito', 'success' )
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
