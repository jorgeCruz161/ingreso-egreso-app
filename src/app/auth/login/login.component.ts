import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading: boolean = false;
  uiSubscriptions: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
     
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email] ],
        password: ['', Validators.required]
    });

    this.uiSubscriptions = this.store.select('ui').subscribe( ui => {
      this.loading = ui.isLoading;
      console.log('cargando subs' )
    } ) 
  }

  ngOnDestroy(){

    this.uiSubscriptions.unsubscribe();

  }

  login(){

    if( this.loginForm.invalid ) { return; }

    this.store.dispatch( ui.isLoading() );

    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading() 
    //   },
    // });

    const { email, password } = this.loginForm.value;

    this.auth.loginUser( email, password).then( (user) => {
      console.log( user );
      this.store.dispatch( ui.stopLoading() );
      // Swal.close();
      this.router.navigate(['/']);
    }).catch( (error) => {

      this.store.dispatch( ui.stopLoading() );
      Swal.fire({
        title: 'Error!',
        text: error.message ,
        icon: 'error',
        confirmButtonText: 'Continuar'
    }) });
  }

}
