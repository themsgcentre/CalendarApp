import { Component, Input } from '@angular/core';
import { CalendarWeek } from '../models/calendar-week';

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrl: './calendar-week.component.scss'
})
export class CalendarWeekComponent {
  @Input() week!: CalendarWeek;

  isSunday(dayIndex: number): boolean {
    return (dayIndex + 1) % 7 === 0;
  }

  selectWeek(): void {
    /*if (this.week.isSelected) {
      this.week.isSelected = false;
      //this.weekSelected.emit(null);
    } else {
      this.week.isSelected = true;
      //this.weekSelected.emit(this.week.days[0].date);
    }*/
  }
}
