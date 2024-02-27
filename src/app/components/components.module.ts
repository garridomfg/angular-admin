import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { CounterComponent } from './counter/counter.component';
import { DonutComponent } from './donut/donut.component';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    CounterComponent,
    DonutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
  ],
  exports: [
    CounterComponent,
    DonutComponent
  ]
})
export class ComponentsModule { }
