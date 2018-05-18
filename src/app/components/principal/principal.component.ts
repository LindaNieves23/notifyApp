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
  ultima = 0;
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.usuario.subscribe(u => {
      this.showPush(u.notificacion);
    });
  }
  showPush(msj) {
    const tamano = msj.length;
    if (this.ultima < tamano) {
      this.ultima = tamano;
      const contacto = msj.pop();
      Notification.requestPermission(function (status) {  // status is "granted", if accepted by user
        const n = new Notification('Tienes ' + tamano + ' notificaciones', {
          body: 'Ultima notificacion: ' + contacto.nombre + '.',
          icon: contacto.url_photo // optional
        });
      });
    }


  }
  cerrarSesion() {
    this.auth.signOut();
  }
}
