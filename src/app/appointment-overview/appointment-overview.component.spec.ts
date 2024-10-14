import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentOverviewComponent } from './appointment-overview.component';
import { Router } from '@angular/router';
import { Appointment } from '../models/appointment';

describe('AppointmentOverviewComponent', () => {
  let component: AppointmentOverviewComponent;
  let fixture: ComponentFixture<AppointmentOverviewComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentOverviewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentOverviewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to edit route with correct appointment details', () => {
    const appointment: Appointment = {
      id: 1,
      title: 'Doctor Appointment',
      date: new Date(2024, 0, 15),
      time: '14:00',
      description: 'Check-up appointment'
    };
    spyOn(router, 'navigate');

    component.editAppointment(appointment);

    expect(router.navigate).toHaveBeenCalledWith([
      '/edit',
      appointment.id,
      appointment.title,
      '2024-01-15',
      appointment.time,
      appointment.description
    ]);
  });
});
