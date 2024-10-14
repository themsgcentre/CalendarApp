import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthComponent } from './month.component';
import { CalendarMonth } from '../models/calendar-month';

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

    component.month = new CalendarMonth("January", new Date(1, 0, 2024), []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
