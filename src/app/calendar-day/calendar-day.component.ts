import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarDay } from '../models/calendar-day';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrl: './calendar-day.component.scss'
})
export class CalendarDayComponent {
  @Input() calendarDay!: CalendarDay;
  @Output() daySelected = new EventEmitter<CalendarDay>();
  selected = false;

  toggleSelected() {
    this.selected = !this.selected;
    if(this.selected) {
      this.daySelected.emit(this.calendarDay);
    }
  }
}
