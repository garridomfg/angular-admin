import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  progress1: number = 50;
  progress2: number = 50;

  get getPercentage1(): string {
    return `${this.progress1}%`;
  }

  get getPercentage2(): string {
    return `${this.progress2}%`;
  }
}
