import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { ListaEmpresasComponent } from './empresas/lista-empresas/lista-empresas.component';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RegistrarEmpresaComponent } from './empresas/registrar-empresa/registrar-empresa.component';
import { ActualizarEmpresaComponent } from './empresas/actualizar-empresa/actualizar-empresa.component'
import { FormsModule } from '@angular/forms';
import { ListarSedesComponent } from './sedes/listar-sedes/listar-sedes.component';
import { ListarEmpleadosComponent } from './empleados/listar-empleados/listar-empleados.component';
import { AccesoUsuarioComponent } from './login/acceso-usuario/acceso-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    EmpresaComponent,
    ListaEmpresasComponent,
    RegistrarEmpresaComponent,
    ActualizarEmpresaComponent,
    ListarSedesComponent,
    ListarEmpleadosComponent,
    AccesoUsuarioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
