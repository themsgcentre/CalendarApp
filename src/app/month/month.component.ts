import { Component, Input, OnChanges } from '@angular/core';
import { CalendarMonth } from '../models/calendar-month';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrl: './month.component.scss'
})
export class MonthComponent {
  @Input() month!: CalendarMonth;
  dayNames = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  isSunday(weekIndex: number): boolean {
    return (weekIndex + 1) % 7 === 0;
  }
}
