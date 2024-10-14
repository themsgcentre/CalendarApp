import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWeekComponent } from './calendar-week.component';
import { CalendarWeek } from '../models/calendar-week';

describe('CalendarWeekComponent', () => {
  let component: CalendarWeekComponent;
  let fixture: ComponentFixture<CalendarWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarWeekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarWeekComponent);
    component = fixture.componentInstance;

    component.week = new CalendarWeek(0, []); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
