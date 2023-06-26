import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { User } from "../models/user.model";
import { AngularFirestore } from '@angular/fire/compat/firestore';

import 'firebase/firestore';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import { Subscription, UnsubscriptionError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener(){
      this.auth.authState.subscribe( fuser => {
        // console.log( fuser?.uid );
        if( fuser ){
          //existe
          this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges().subscribe(
            (firestoreUser: any) => {

              console.log({ firestoreUser } )
          
              const user = User.fromFirebase( firestoreUser )

              this.store.dispatch( authActions.setUser({ user: user }) )
            })
       
          
        }else{
          //no existe
          this.userSubscription.unsubscribe();
          this.store.dispatch(authActions.unSetUser() );
        }
 

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
