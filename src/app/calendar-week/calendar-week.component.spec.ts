import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWeekComponent } from './calendar-week.component';
import { CalendarWeek } from '../models/calendar-week';
import { CalendarDay } from '../models/calendar-day';

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

  it('should correctly identify if the day is Sunday', () => {
    expect(component.isSunday(6)).toBeTruthy();
    expect(component.isSunday(5)).toBeFalsy();
  });

  it('should return true if the day has an appointment', () => {
    const day: CalendarDay = new CalendarDay(new Date(2024, 0, 15), false, true, false);
    component.appointments = [
      { id: 1, title: 'Meeting', date: new Date(2024, 0, 15), time: '14:00', description: 'Team meeting' }
    ];

    expect(component.hasAppointment(day)).toBeTruthy();
  });

  it('should return false if the day has no appointment', () => {
    const day: CalendarDay = new CalendarDay(new Date(2024, 0, 16), false, true, false);
    component.appointments = [
      { id: 1, title: 'Meeting', date: new Date(2024, 0, 15), time: '14:00', description: 'Team meeting' }
    ];

    expect(component.hasAppointment(day)).toBeFalsy();
  });

  it('should emit daySelected event when a day is selected', () => {
    const day: CalendarDay = new CalendarDay(new Date(2024, 0, 16), false, true, false);
    spyOn(component.daySelected, 'emit');
    component.onDaySelected(day);
    expect(component.daySelected.emit).toHaveBeenCalledWith(day);
  });

  it('should emit dayUnselected event when a day is unselected', () => {
    const day: CalendarDay = new CalendarDay(new Date(2024, 0, 16), false, true, true);
    spyOn(component.dayUnselected, 'emit');
    component.onDayUnselected(day);
    expect(component.dayUnselected.emit).toHaveBeenCalledWith(day);
  });
});
