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

import { RegistrarEmpleadosComponent } from './empleados/registrar-empleados/registrar-empleados.component';
import { LoginComponent } from './usuarios/login.component';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RegistrarSedeComponent } from './sedes/registrar-sede/registrar-sede.component';




@NgModule({
  declarations: [
    AppComponent,
    EmpresaComponent,
    ListaEmpresasComponent,
    RegistrarEmpresaComponent,
    ActualizarEmpresaComponent,
    ListarSedesComponent,
    ListarEmpleadosComponent,
     RegistrarEmpleadosComponent,
    LoginComponent,
    RegistrarSedeComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
