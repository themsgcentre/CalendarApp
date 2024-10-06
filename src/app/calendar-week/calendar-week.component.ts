import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarWeek } from '../models/calendar-week';
import { CalendarDay } from '../models/calendar-day';

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrl: './calendar-week.component.scss'
})
export class CalendarWeekComponent {
  @Input() week!: CalendarWeek;
  @Output() daySelected = new EventEmitter<CalendarDay>();
  @Output() dayUnselected = new EventEmitter<CalendarDay>();

  isSunday(dayIndex: number): boolean {
    return (dayIndex + 1) % 7 === 0;
  }

  onDaySelected(day: CalendarDay) {
    this.daySelected.emit(day);
  }

  onDayUnselected(day: CalendarDay) {
    this.dayUnselected.emit(day);
  }
}
