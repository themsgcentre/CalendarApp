import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';
import { MonthPickerComponent } from '../month-picker/month-picker.component';
import { CalendarService } from '../services/calendar.service';
import { MonthComponent } from '../month/month.component';
import { CalendarMonth } from '../models/calendar-month';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let mockCalendarService = {
    getMonth: jasmine.createSpy('getMonth').and.returnValue(new CalendarMonth("Jan", new Date(2024, 0, 1), []))
  };  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CalendarComponent,
        MonthPickerComponent,
        MonthComponent      
      ],
      providers: [
        { provide: CalendarService, useValue: mockCalendarService } 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the correct month on init', () => {
    component.ngOnInit();
    expect(mockCalendarService.getMonth).toHaveBeenCalledWith(0, []);
    const expected = new CalendarMonth("Jan", new Date(2024, 0, 1),[]);
    expect(component.month).toEqual(expected);
  });

  it('should change the offset and get new month when offsetChanged is called', () => {
    component.offsetChanged(1);
    expect(component.offset).toBe(1);
    expect(mockCalendarService.getMonth).toHaveBeenCalledWith(1, []);
  });
});

