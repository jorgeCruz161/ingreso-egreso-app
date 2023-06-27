import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private fstore: AngularFirestore,
    private authService: AuthService,
  ) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ){
    const uid = this.authService.user.uid

    delete ingresoEgreso.uid;

    return this.fstore.doc(`${ uid }/ingreso-egreso`)
      .collection('items')
      .add({...ingresoEgreso} )
    
  }

  initIngresosEgresosListener( uid:string ){
    return this.fstore.collection(`${uid}/ingreso-egreso/items`)
    .snapshotChanges()
    .pipe( 
      map( snapshot =>  snapshot.map( doc =>({ 
             uid: doc.payload.doc.id,
             ...doc.payload.doc.data() as any
           })
        )
      )
     )
  }

  borrarIngresoEgreso( uidItem: string){

    const uid = this.authService.user.uid

    return this.fstore.doc(`${uid}/ingreso-egreso/items/${uidItem}`).delete();
  }

}
