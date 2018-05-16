import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Usuario } from '../models/usuario';
import {MatSnackBar} from '@angular/material';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

@Injectable()
export class AuthService {

  usuario: Observable<Usuario>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router, public snackBar: MatSnackBar,
    private storage: AngularFireStorage) {

    //// Get auth data, then get firestore user document || null
    this.usuario = this.afAuth.authState
      .switchMap(usuario => {
        if (usuario) {
          return this.afs.doc<Usuario>(`contactos/${usuario.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }


  subirImagen(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.storage.ref(id);
    this.task = this.ref.put(event.target.files[0]);

    this.uploadPercent = this.task.percentageChanges();
    // get notified when the download URL is available
    this.downloadURL = this.task.downloadURL();
  }

  enviarNotificacion(u: Usuario, fromuser: Usuario) {
    let flag: boolean;
    flag = true;
    this.afs.collection<Usuario>('contactos', ref => ref.where('email', '==', u.email))
    .valueChanges().subscribe(r => {
      if (r.length === 0) {
        this.enviarEmail();
      } else if (flag) {
       flag = false;
       r[0].notificacion.push({nombre: fromuser.nombre, email: fromuser.email});
       let lista;
       lista = r[0].notificacion;
       this.updateUser(r[0], {notificacion: lista});
       console.log(lista);
      }
    });
  }

/*  notificarUpdate() {
    if (r.length === 0) {
      this.enviarEmail();
    } else {
     r[0].notificacion.push({nombre: fromuser.nombre, email: fromuser.email});
     return this.updateUser(r[0], {notificacion: r[0].notificacion});
    }
  } */

  enviarEmail() {
    console.log('Se envia el email');
  }
  emailSignUp(u: Usuario) {
    return this.afAuth.auth.createUserWithEmailAndPassword(u.email, u.pass)
      .then(userfs => {
        u.uid = userfs.uid;
        this.router.navigate(['/principal' , { outlets: { mainoutler: ['admin'] } }]);
        return this.crearUsuario(u);
      })
      .catch(error => this.handleError(error) );
  }

  private crearUsuario(usuario) {

    const userRef: AngularFirestoreDocument<Usuario> = this.afs.doc(`contactos/${usuario.uid}`);

    const data: Usuario = {
      uid: usuario.uid,
      email: usuario.email || null,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      telefono: usuario.telefono,
      contactos: [],
      notificacion: [],
      url_photo: 'assets/user.png'
    };

    return userRef.set(data);

  }


  updateUser(usuario: Usuario, data: any) {
    return this.afs.doc(`contactos/${usuario.uid}`).update(data);
  }



  // If error, console log and notify user
  private handleError(error) {
    console.error(error);
    this.snackBar.open(error, 'Cerrar', {
      duration: 5000,
    });
  }

  /// Additional useful methods, not used in video
  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(r => this.router.navigate(['/principal' , { outlets: { mainoutler: ['admin'] } }]))
      .catch(error => this.handleError(error) );
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('Password update email sent'))
      .catch((error) => this.handleError(error) );
  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }

}
