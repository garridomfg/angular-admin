import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css'],
})
export class DonutComponent implements OnInit {
  @Input() title: string = 'Untitle';
  @Input() labels: string[] = [];
  @Input() data: number[] = [];

  // Doughnut
  public doughnutChartData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: [],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      },
    ],
  };

  ngOnInit(): void {
    this.doughnutChartData.labels = this.labels;
    this.doughnutChartData.datasets.map((d) => (d.data = this.data));
  }
}
