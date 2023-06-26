import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authServices: AuthService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
        nombre: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email ]],
        password: ['', Validators.required]
    })
  }

  createUser(){

    if(this.registerForm.invalid ){ return; }

    
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading() 
      },
    });

    const { nombre, correo, password } = this.registerForm.value;

    this.authServices.createUser( nombre, correo, password)
    .then( credenciales => {
      console.log( credenciales);
      Swal.close();
      this.router.navigate(['/']);
    }).catch( error => {
      Swal.fire({
        title: 'Error!',
        text: error.message ,
        icon: 'error',
        confirmButtonText: 'Continuar'
    }) 

    } );



    
    
  }

}
