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

  it('should toggle selected state and emit correct events', () => {
    component.selected = false;  
    component.calendarDay = new CalendarDay(new Date(), false, true, false);

    spyOn(component.daySelected, 'emit');
    spyOn(component.dayUnselected, 'emit');

    component.toggleSelected();

    expect(component.selected).toBeTruthy();
    expect(component.daySelected.emit).toHaveBeenCalledWith(component.calendarDay);
    expect(component.dayUnselected.emit).not.toHaveBeenCalled();

    component.toggleSelected();

    expect(component.selected).toBeFalsy();
    expect(component.dayUnselected.emit).toHaveBeenCalledWith(component.calendarDay);
    expect(component.daySelected.emit).toHaveBeenCalledTimes(1);
  });
});
