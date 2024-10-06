import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CalendarMonth } from '../models/calendar-month';
import { CalendarService } from '../services/calendar.service';
import { CalendarDay } from '../models/calendar-day';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit, OnChanges {
  constructor(private calendarService: CalendarService) {}
  offset = 0;
  month!: CalendarMonth;
  @Output() daySelected = new EventEmitter<CalendarDay>();
  @Output() dayUnselected = new EventEmitter<CalendarDay>();
  @Input() isFiltered: boolean = false;

  ngOnInit(): void {
    this.month = this.calendarService.getMonth(this.offset, []);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isFiltered'] && this.isFiltered === false) {
      this.month = this.calendarService.getMonth(this.offset, []);
    }
  }

  offsetChanged(offsetChange: number) {
    this.offset = this.offset + offsetChange;
    this.month = this.calendarService.getMonth(this.offset, []);
  }

  onDaySelected(day: CalendarDay) {
    this.daySelected.emit(day);
  }

  onDayUnselected(day: CalendarDay) {
    this.dayUnselected.emit(day);
  }
}
