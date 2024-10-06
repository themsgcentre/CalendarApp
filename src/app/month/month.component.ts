import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CalendarMonth } from '../models/calendar-month';
import { CalendarDay } from '../models/calendar-day';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrl: './month.component.scss'
})
export class MonthComponent {
  @Input() month!: CalendarMonth;
  dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  @Output() daySelected = new EventEmitter<CalendarDay>();
  @Output() dayUnselected = new EventEmitter<CalendarDay>();

  isSunday(weekIndex: number): boolean {
    return (weekIndex + 1) % 7 === 0;
  }

  onDaySelected(day: CalendarDay) {
    this.daySelected.emit(day);
  }

  onDayUnselected(day: CalendarDay) {
    this.dayUnselected.emit(day);
  }
}
