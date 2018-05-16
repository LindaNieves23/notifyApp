import { NgModule } from '@angular/core';
import { MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatTableModule, MatIconModule,
  MatToolbarModule, MatMenuModule, MatSnackBarModule,
  MatSidenavModule, MatCheckboxModule, MatDialogModule, MatProgressBarModule, MatProgressSpinnerModule
   } from '@angular/material';
const modules_material = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatTableModule,
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatDialogModule,
  MatProgressSpinnerModule];
@NgModule({
  imports: modules_material,
  exports: modules_material
})
export class MaterialmModule { }
