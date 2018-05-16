import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  rusuario: Usuario = {
    uid: '',
    email: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AdduserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

     }

  ngOnInit() {
    if ( this.data.user) {
      this.rusuario = this.data.user;
    }
  }
  save() {
    this.dialogRef.close({user: this.rusuario});
  }
  notify() {
    this.dialogRef.close({user: this.rusuario, modo: 1});
  }
  eliminar() {
    this.dialogRef.close({user: this.rusuario, modo: 2});
  }
  close() {
    this.dialogRef.close();
  }
}
