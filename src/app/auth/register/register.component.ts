import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as ui from 'src/app/shared/ui.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  loading: boolean = false;
  uiSubscriptions: Subscription;
  
  constructor(
    private fb: FormBuilder,
    private authServices: AuthService,
    private router: Router,
    private store: Store<AppState>,
  ){

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
        nombre: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email ]],
        password: ['', Validators.required]
    });

    this.uiSubscriptions = this.store.select('ui').subscribe( 
      ui => this.loading = ui.isLoading
    ) 
  }

  ngOnDestroy(): void {
    this.uiSubscriptions.unsubscribe();

  }

  createUser(){

    if(this.registerForm.invalid ){ return; }

    this.store.dispatch( ui.isLoading() );
    
    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading() 
    //   },
    // });

    const { nombre, correo, password } = this.registerForm.value;

    this.authServices.createUser( nombre, correo, password)
    .then( credenciales => {
      console.log( credenciales);

      this.store.dispatch( ui.stopLoading() );
      // Swal.close();
      this.router.navigate(['/']);
    }).catch( error => {

      this.store.dispatch( ui.stopLoading() );
      Swal.fire({
        title: 'Error!',
        text: error.message ,
        icon: 'error',
        confirmButtonText: 'Continuar'
    }) 

    } );



    
    
  }

}
