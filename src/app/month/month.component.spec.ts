import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthComponent } from './month.component';
import { CalendarMonth } from '../models/calendar-month';
import { CalendarDay } from '../models/calendar-day';

describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthComponent);
    component = fixture.componentInstance;

    component.month = new CalendarMonth("January", new Date(2024, 0, 1), []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly identify if the week index is Sunday', () => {
    expect(component.isSunday(6)).toBeTruthy(); 
    expect(component.isSunday(5)).toBeFalsy(); 
  });

  it('should emit daySelected event when a day is selected', () => {
    const day: CalendarDay = new CalendarDay(new Date(2024, 0, 15), false, true, false);
    spyOn(component.daySelected, 'emit');
    component.onDaySelected(day);
    expect(component.daySelected.emit).toHaveBeenCalledWith(day);
  });

  it('should emit dayUnselected event when a day is unselected', () => {
    const day: CalendarDay = new CalendarDay(new Date(2024, 0, 15), false, true, true);
    spyOn(component.dayUnselected, 'emit');
    component.onDayUnselected(day);
    expect(component.dayUnselected.emit).toHaveBeenCalledWith(day);
  });
});
