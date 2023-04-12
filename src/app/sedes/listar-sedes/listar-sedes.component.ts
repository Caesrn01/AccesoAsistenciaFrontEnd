import { Component, OnInit } from '@angular/core';
import { SedeService } from '../../service/sede.service';
import { Router } from '@angular/router';
import { Sede } from '../../class/sede';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-sedes',
  templateUrl: './listar-sedes.component.html',
  styleUrls: ['./listar-sedes.component.css']
})
export class ListarSedesComponent implements OnInit {

  sedes:Sede[];
  totalSedes:number=0;

  constructor(private sedeService:SedeService,private router:Router) { }

  ngOnInit(): void {
  
    this.obtenerSedes();
  }

  private obtenerSedes(){
    this.sedeService.obtenerListaSedes().subscribe(sedes => {
        this.sedes = sedes;
        this.totalSedes = this.sedes.length;
        console.log(this.sedes);
    });
  }


  eliminarSede(sede:Sede){
 
         Swal.fire({
           title: 'Esta seguro?',
           text: `Esta seguro que desea eliminar a la sede  ${sede.nombreSede} `,
           icon: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Si, eliminar!'
         }).then((result) => {
           if (result.isConfirmed) {
             this.sedeService.eliminarSede(sede.idSede).subscribe(
               () => {
                     this.sedes = this.sedes.filter(sed => sed !== sede)
                     Swal.fire('Sede Eliminado!',`Empresa  ${sede.nombreSede}  eliminado con exito`,'success')
               }
             )
           }
        }) 
         
     }


}
