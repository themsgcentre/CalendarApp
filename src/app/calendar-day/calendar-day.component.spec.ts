import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayComponent } from './calendar-day.component';
import { CalendarDay } from '../models/calendar-day';

describe('CalendarDayComponent', () => {
  let component: CalendarDayComponent;
  let fixture: ComponentFixture<CalendarDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarDayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarDayComponent);
    component = fixture.componentInstance;

    component.calendarDay = new CalendarDay(new Date(), false, true, false); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
