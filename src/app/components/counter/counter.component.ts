import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent implements OnInit {
  @Input('value') progress: number = 0;
  @Input() btnClass: string = 'btn-primary';

  @Output() outputValue: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  get getInvalid(): boolean {
    if (this.progress > 100) return true;
    if (this.progress < 0) return true;
    return false;
  }

  changeValue(value: number): void {
    if (this.progress >= 100 && value >= 0) {
      this.outputValue.emit(100);
    }
    if (this.progress <= 0 && value < 0) {
      this.outputValue.emit(0);
    }
    this.progress = this.progress + value;
    this.outputValue.emit(this.progress);
  }

  onChange(value: number) {
    this.progress = value;
    this.outputValue.emit(this.progress);
  }
}
