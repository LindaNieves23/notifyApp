import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../nucleo/auth.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  usuario: Usuario = {
    uid: '',
    email: ''
  };
  constructor(public auth: AuthService, public snackBar: MatSnackBar) { }

  uploadFile(event) {
    this.auth.subirImagen(event);
    this.auth.downloadURL.subscribe(url => {
      this.cambiarImg(url);
    });
  }

  ngOnInit() {
    this.auth.usuario.subscribe(r => {
      this.cargarUsuario(r);
    });
  }
  cambiarImg(img) {
    this.usuario.url_photo = img;
  }
  cargarUsuario(u) {
    this.usuario = u;
  }

  actualizar() {
    this.auth.updateUser(this.usuario, {
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      telefono: this.usuario.telefono,
      url_photo: this.usuario.url_photo
    }).then(r => {
      this.snackBar.open('Datos Actualizado', 'Cerrar', {
        duration: 5000,
      });
    }).catch(err => {
      this.snackBar.open(err, 'Cerrar', {
        duration: 5000,
      });
    });
  }

}
