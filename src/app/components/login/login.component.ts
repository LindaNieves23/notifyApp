import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../nucleo/auth.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = {
    uid: '',
    email: ''
  };

  constructor(public auth: AuthService, private router: Router) { }

  iniciarSesion() {
    this.auth.emailLogin(this.usuario.email, this.usuario.pass);
  }


  ngOnInit() {
  }


}
