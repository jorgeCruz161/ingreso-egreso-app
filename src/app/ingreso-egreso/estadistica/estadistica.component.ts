import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ChartData } from 'chart.js';

import { IngresoEgreso } from 'src/app/models/ingreso-egreso';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit , OnDestroy{

  ingreso: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

  // Doughnut
  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos', ];
  public doughnutChartData: ChartData<'doughnut'>;
 

  constructor(
    private store: Store<AppStateWithIngreso>,

  ){}

  ngOnInit() {
      this.store.select('ingresosEgresos')
      .subscribe( ({ items }) => this.generarEstadistica( items ))

  }

  ngOnDestroy() {
    
  }

  generarEstadistica( items: IngresoEgreso[] ){

    this.totalEgresos = 0;
    this.totalIngresos = 0;

    this.ingreso = 0;
    this.egresos = 0;

    for (const item of items) {
      if( item.tipo === 'ingreso' ){
        this.totalIngresos += item.monto;
        this.ingreso ++;
      }else {
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    }

      // Doughnut
      const doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
 
      this.doughnutChartData = {
        labels: doughnutChartLabels,
        datasets: [
          {
            data: [this.totalIngresos, this.totalEgresos],
         
          }
        ]
      };
  }
  
}
