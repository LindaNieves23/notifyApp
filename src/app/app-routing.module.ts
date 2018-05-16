import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { AuthGuard } from './nucleo/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent },
  { path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'admin', pathMatch: 'full'},
    { path: 'admin', component: AdminComponent , outlet: 'mainoutler'},
    { path: 'configurar', component: ConfiguracionComponent , outlet: 'mainoutler'},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
