import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmpresasComponent } from './empresas/lista-empresas/lista-empresas.component';
import { RegistrarEmpresaComponent } from './empresas/registrar-empresa/registrar-empresa.component';
import { ActualizarEmpresaComponent } from './empresas/actualizar-empresa/actualizar-empresa.component';


const routes: Routes=[
  {path: 'listar-empresas',component:ListaEmpresasComponent},
  {path:'', redirectTo:'listar-empresas',pathMatch:'full'},
  {path:'registrar-empresa',component:RegistrarEmpresaComponent},
  {path:'actualizar-empresa/:id',component:ActualizarEmpresaComponent}
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
