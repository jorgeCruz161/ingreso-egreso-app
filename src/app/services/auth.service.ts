import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { User } from "../models/user.model";
import { AngularFirestore } from '@angular/fire/compat/firestore';

import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) { }

  initAuthListener(){
      this.auth.authState.subscribe( fuser => {
        console.log(fuser);
        console.log( fuser?.uid );
        console.log( fuser?.email );

      } )
  }

  createUser( nombre: string, correo: string, password: string) {
    
    return this.auth.createUserWithEmailAndPassword (correo, password )
      .then( ( { user }) => {

          const newUser = new User( user.uid, nombre, user.email );

          this.firestore.doc(`${ user.uid}/usuario` ).set( {  ...newUser })
      }) ;

  }

  loginUser( email: string, password: string){

    return this.auth.signInWithEmailAndPassword(email, password)

  }

  logout(){
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fuser => fuser !== null )
    )
  }




}
