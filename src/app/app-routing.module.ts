import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmpresasComponent } from './empresas/lista-empresas/lista-empresas.component';
import { RegistrarEmpresaComponent } from './empresas/registrar-empresa/registrar-empresa.component';
import { ActualizarEmpresaComponent } from './empresas/actualizar-empresa/actualizar-empresa.component';
import { LoginComponent } from './usuarios/login.component';
import {ListarEmpleadosComponent} from './empleados/listar-empleados/listar-empleados.component';
import {RegistrarEmpleadosComponent} from './empleados/registrar-empleados/registrar-empleados.component';

const routes: Routes=[
  {path: 'empresas/listar-empresas',component:ListaEmpresasComponent},
  {path:'', redirectTo:'empresas/listar-empresas',pathMatch:'full'},
  {path:'empresas/registrar',component:RegistrarEmpresaComponent},
  {path:'empresas/actualizar/:id',component:RegistrarEmpresaComponent},
  {path: 'empleados/listar',component:ListarEmpleadosComponent},
   {path:'empleados/registrar',component:RegistrarEmpleadosComponent},
   {path:'empleados/actualizar/:id',component:RegistrarEmpleadosComponent},
  {path:'login',component:LoginComponent}
  //{path:'actualizar-empresa/:id',component:ActualizarEmpresaComponent}
  //{path:'',component:}

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
