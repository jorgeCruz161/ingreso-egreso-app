import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';


//Angular Fire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'

//modulos
import { AppRountingModule } from './app-routing.module';

//NGRX
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthModule } from './auth/auth.module';


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
  ],
  imports: [
    BrowserModule,

    AuthModule,

    NgbModule, 
    AppRountingModule,
   
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: isDevMode()
    }),
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
