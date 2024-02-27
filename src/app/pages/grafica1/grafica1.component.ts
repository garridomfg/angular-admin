import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  public labels1: string[] = [
    'Download Sales1',
    'In-Store Sales1',
    'Mail-Order Sales1',
  ];
  public data1: number[] = [30, 45, 10];

  public labels2: string[] = [
    'Download Sales2',
    'In-Store Sales2',
    'Mail-Order Sales2',
  ];
  public data2: number[] = [350, 450, 100];

  public labels3: string[] = [
    'Download Sales3',
    'In-Store Sales3',
    'Mail-Order Sales3',
  ];
  public data3: number[] = [3500, 4500, 1000];

  public labels4: string[] = [
    'Download Sales4',
    'In-Store Sales4',
    'Mail-Order Sales4',
  ];
  public data4: number[] = [35000, 45000, 10000];
}
