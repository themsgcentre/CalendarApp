import { Component, Input } from '@angular/core';
import { CalendarDay } from '../models/calendar-day';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrl: './calendar-day.component.scss'
})
export class CalendarDayComponent {
  @Input() calendarDay!: CalendarDay;
}
