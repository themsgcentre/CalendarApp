import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrl: './month-picker.component.scss'
})
export class MonthPickerComponent {
  @Input() monthName: string | null = null;
  @Output() offsetChange = new EventEmitter<number>();
  getPreviousMonth() {
    this.offsetChange.emit(-1);
  }

  getNextMonth() {
    this.offsetChange.emit(1);
  }
}
