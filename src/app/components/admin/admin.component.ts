import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../nucleo/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdduserComponent } from '../adduser/adduser.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  rusuario: Usuario = {
    uid: '',
    email: ''
  };
  displayedColumns = ['email', 'nombre'];
  dataSource = [];
  usuarioActual: Usuario;
  constructor(public auth: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
    // cargo toda la lista de contacto
    this.auth.usuario.subscribe(u => this.cargarUsuario(u));
    // this.dataSource = this.usuarioActual.contactos;
  }

  modificar(usuario) {
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '350px',
      data: { user: usuario, modificar: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.modo === 1) {
          this.notificar(result.user);
        } else if (result.modo === 2) {
          this.eliminarUsuario(result.user);
        } else {
          this.rusuario = result.user;
          this.guardarContacto();
        }

      }
    });
  }
  cargarUsuario(u: Usuario) {
    if (u) {
      this.usuarioActual = u;
      this.dataSource = u.contactos;
    }
  }
  eliminarUsuario(u: Usuario) {
    let indice;
    indice = this.estaEnlista(u);
    if (indice >= 0) {
      this.usuarioActual.contactos.splice(indice, 1);
      this.auth.updateUser(this.usuarioActual, { contactos: this.usuarioActual.contactos })
        .catch(e => console.log(e));
    }
  }
  estaEnlista(u: Usuario) {
    for (let x = 0; x < this.usuarioActual.contactos.length; x++) {
      if (this.usuarioActual.contactos[x].email === u.email) {
        return x;
      }
    }
    return -1;
  }

  abrirDialogo() {
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '350px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rusuario = result.user;
        this.guardarContacto();
      }

    });
  }
  guardarContacto() {
    let indice;
    indice = this.estaEnlista(this.rusuario);
    if (indice >= 0) {
      this.usuarioActual.contactos[indice] = this.rusuario;
    } else {
      this.usuarioActual.contactos.push(this.rusuario);
    }
    this.auth.updateUser(this.usuarioActual, { contactos: this.usuarioActual.contactos })
      .catch(e => console.log(e));
    // console.log(this.usuarioActual);
  }

  notificar(u: Usuario) {
    this.auth.enviarNotificacion(u, this.usuarioActual);
  }

}
