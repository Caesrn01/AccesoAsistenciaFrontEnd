import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   titulo: string = 'App Acceso'
  title = 'Sistema Administracion de Gestion de Accessos a empleados';


  constructor(public authService: AuthService, private router: Router) { }
  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success' )
    this.router.navigate(['/login']);
  }
}
