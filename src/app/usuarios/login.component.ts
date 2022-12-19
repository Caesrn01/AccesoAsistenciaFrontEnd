import { Component, OnInit } from '@angular/core';
import { Usuario } from '../class/usuario';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  titulo: string = 'Por favor Sign In!';
  usuario: Usuario;

  

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
   /* if (this.authService.isAuthenticated()) {
     // swal('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
      Swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info' )

      this.router.navigate(['/empresas/listar-empresas']);
    }*/


    if (this.authService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info' )
      this.router.navigate(['/empresas/listar-empresas']);
    }
  }

  /*
  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      
      Swal.fire({icon: 'error', title: 'Error', text: 'Username o password vacías!'})

      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      
      //swal('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
      Swal.fire('Login', `Hola ${this.usuario.username}, has iniciado sesión con éxito!`, 'success' )
      this.router.navigate(['empresas/listar-empresas']);
    
  }, err => {
    if (err.status == 400) {
       Swal.fire({icon: 'error', title: 'Error Login', text: 'Usuario o clave incorrectas!'});
    }
  }




  
  
  
  )

}*/



login(): void {
 
  
  console.log(this.usuario.username);
  console.log(this.usuario.password );
  /*if (this.usuario.username == null || this.usuario.password == null) {
    Swal.fire({icon: 'error', title: 'Error', text: 'Username o password vacías!'})
    return;
  }*/

  if (this.usuario.username == "" || this.usuario.password == "") {
    Swal.fire({icon: 'error', title: 'Error', text: 'Username o password vacías!'})
    return;
  }

  this.authService.login(this.usuario)
  .subscribe(response => {

    console.log(response);

    this.authService.guardarUsuario(response.access_token);
    this.authService.guardarToken(response.access_token);
    let usuario = this.authService.usuario;
    this.router.navigate(['/empresas/listar-empresas']);
 
    Swal.fire('Login', `Hola ${this.usuario.username}, has iniciado sesión con éxito!`, 'success' )
  }, err => {

    if (err.status == 400) {
      //swal('Error Login', 'Usuario o clave incorrectas!', 'error');
      Swal.fire({icon: 'error', title: 'Error Login', text: 'Usuario o clave incorrectas!'})
    }
  }
  );
}

/*

      login(): void {
        console.log(this.usuario);
        if (this.usuario.username == null || this.usuario.password == null) {
          swal('Error Login', 'Username o password vacías!', 'error');

          return;
        }

        this.authService.login(this.usuario).subscribe(response => {
          console.log(response);

          this.authService.guardarUsuario(response.access_token);
          this.authService.guardarToken(response.access_token);
          let usuario = this.authService.usuario;
          this.router.navigate(['/clientes']);
          swal('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
        }, err => {
          if (err.status == 400) {
            swal('Error Login', 'Usuario o clave incorrectas!', 'error');
          }
        }
        );
      }


*/

}
