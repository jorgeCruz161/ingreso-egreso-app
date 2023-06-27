import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso';

export const unSetItems = createAction('[IngresoEgreso] Uset Items');
export const setItems = createAction(
    '[IngresoEgreso] Set Items',
    props<{ items: IngresoEgreso[] }>()
    );
