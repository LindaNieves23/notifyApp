import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { NucleoModule } from './nucleo/nucleo.module';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { MaterialmModule } from './materialm/materialm.module';
import { AppRoutingModule } from './/app-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    AdminComponent,
    AdduserComponent,
    ConfiguracionComponent
  ],
  imports: [
    BrowserModule, HttpModule, HttpClientModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialmModule, // carga el tema de material design
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'), // configuracion de la libreria para la conexion con firebase
    AngularFirestoreModule,
    AngularFireStorageModule,
    NucleoModule, // carga los servicios de autenticacion y de manipulacio de la db
    AppRoutingModule // carga los routers, para cada componente
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AdduserComponent]
})
export class AppModule { }
