import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { IngresoEgreso } from 'src/app/models/ingreso-egreso';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {
  
  ingresosEgresos: IngresoEgreso[] = [];
  ingresoEgresosSubs: Subscription;

  constructor(
    private store: Store<AppStateWithIngreso>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {

     this.ingresoEgresosSubs = this.store.select('ingresosEgresos').subscribe( ({items}) =>  this.ingresosEgresos = items )
    
  }

  ngOnDestroy() {
    this.ingresoEgresosSubs.unsubscribe();
  }

  remove( uid: string ) {
    this.ingresoEgresoService.borrarIngresoEgreso( uid )
    .then( () => {
      Swal.fire( 'Borrado', 'El elemento se borro', 'success'  )
    })
    .catch(  err=> { Swal.fire('Error', err.message, 'error')  });
  }

}
