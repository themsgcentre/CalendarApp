import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { AppointmentService } from '../services/appointment.service';
import { of } from 'rxjs';
import { Appointment } from '../models/appointment';
import { CalendarDay } from '../models/calendar-day';
import { CalendarComponent } from '../calendar/calendar.component';
import { AppointmentOverviewComponent } from '../appointment-overview/appointment-overview.component';
import { MonthPickerComponent } from '../month-picker/month-picker.component';
import { MonthComponent } from '../month/month.component';
import { RouterModule } from '@angular/router';
import { CalendarWeekComponent } from '../calendar-week/calendar-week.component';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  const mockAppointmentService = {
    getFilteredAppointments: jasmine.createSpy('getFilteredAppointments').and.returnValue(of([])),
    getAllAppointments: jasmine.createSpy('getAllAppointments').and.returnValue(of([])),
    isFiltered: jasmine.createSpy('isFiltered').and.returnValue(of(false)),
    addFilter: jasmine.createSpy('addFilter'),
    removeFilter: jasmine.createSpy('removeFilter'),
    clearFilter: jasmine.createSpy('clearFilter'),
    removeAppointment: jasmine.createSpy('removeAppointment')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        CalendarComponent,
        AppointmentOverviewComponent,
        MonthPickerComponent,
        MonthComponent,
        CalendarWeekComponent,
        CalendarDayComponent
      ],
      providers: [
        { provide: AppointmentService, useValue: mockAppointmentService }
      ],
      imports: [
        RouterModule.forRoot([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with appointments and filter status', () => {
    component.ngOnInit();
    expect(mockAppointmentService.getFilteredAppointments).toHaveBeenCalled();
    expect(mockAppointmentService.getAllAppointments).toHaveBeenCalled();
    expect(mockAppointmentService.isFiltered).toHaveBeenCalled();
  });

  it('should add filter when a day is selected', () => {
    const day = new CalendarDay(new Date(), false, true, false);
    component.onDaySelected(day);
    expect(mockAppointmentService.addFilter).toHaveBeenCalledWith(day.date);
  });

  it('should remove filter when a day is unselected', () => {
    const day = new CalendarDay(new Date(), false, true, true);
    component.onDayUnselected(day);
    expect(mockAppointmentService.removeFilter).toHaveBeenCalledWith(day.date);
  });

  it('should clear filter', () => {
    component.filterRemoved();
    expect(mockAppointmentService.clearFilter).toHaveBeenCalled();
  });

  it('should remove an appointment', () => {
    const appointment = new Appointment(1, new Date(), 'Test Title', 'Test Description', '10:00');
    component.deleteAppointment(appointment);
    expect(mockAppointmentService.removeAppointment).toHaveBeenCalledWith(appointment);
  });
});
