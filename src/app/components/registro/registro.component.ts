import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../nucleo/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  rusuario: Usuario = {
    uid: '',
    email: ''
  };


  constructor(public auth: AuthService, private location: Location ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  registrar() {
    this.auth.emailSignUp(this.rusuario);
  }
}
