import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CalendarMonth } from '../models/calendar-month';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  constructor(private calendarService: CalendarService) {}
  offset = 0;
  month!: CalendarMonth;
  ngOnInit(): void {
    this.month = this.calendarService.getMonth(this.offset);
  }

  offsetChanged(offsetChange: number) {
    this.offset = this.offset + offsetChange;
    this.month = this.calendarService.getMonth(this.offset);
  }
}
