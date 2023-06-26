import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

//Angular Fire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'

//modulos
import { AppRountingModule } from './app-routing.module';
import  { ReactiveFormsModule } from '@angular/forms';

//NGRX
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const config = {
  apiKey: "AIzaSyCQyklU9mmyTKtkz17POSbJpibH3kTpfuw",
  authDomain: "ingreso-egreso-angular-63eae.firebaseapp.com",
  projectId: "ingreso-egreso-angular-63eae",
  storageBucket: "ingreso-egreso-angular-63eae.appspot.com",
  messagingSenderId: "918454362946",
  appId: "1:918454362946:web:7e94c342fdf104380cdedb",
  measurementId: "G-QHHBY5EG68"
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent    
  ],
  imports: [
    BrowserModule,
    NgbModule, 
    AppRountingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: isDevMode()
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
