import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../nucleo/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  mode = 'over';

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }
  cerrarSesion() {
    this.auth.signOut();
  }
}
