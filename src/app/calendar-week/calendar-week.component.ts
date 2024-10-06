import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarWeek } from '../models/calendar-week';
import { CalendarDay } from '../models/calendar-day';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrl: './calendar-week.component.scss'
})
export class CalendarWeekComponent {
  @Input() week!: CalendarWeek;
  @Output() daySelected = new EventEmitter<CalendarDay>();
  @Output() dayUnselected = new EventEmitter<CalendarDay>();
  @Input() appointments: Appointment[] = [];

  isSunday(dayIndex: number): boolean {
    return (dayIndex + 1) % 7 === 0;
  }

  hasAppointment(day: CalendarDay): boolean {
    return this.appointments.some(appointment => 
      appointment.date.toDateString() === day.date.toDateString()
    );
  }

  onDaySelected(day: CalendarDay) {
    this.daySelected.emit(day);
  }

  onDayUnselected(day: CalendarDay) {
    this.dayUnselected.emit(day);
  }
}
