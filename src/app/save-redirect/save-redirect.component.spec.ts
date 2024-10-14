import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaveRedirectComponent } from './save-redirect.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { of } from 'rxjs';
import { Appointment } from '../models/appointment';

describe('SaveRedirectComponent', () => {
  let component: SaveRedirectComponent;
  let fixture: ComponentFixture<SaveRedirectComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  let mockAppointmentService = {
    addAppointment: jasmine.createSpy('addAppointment')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveRedirectComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              id: 1,
              title: 'Test Appointment',
              date: '2024-10-14',
              time: '10:00',
              description: 'Test description'
            })
          }
        },
        { provide: Router, useValue: mockRouter },
        { provide: AppointmentService, useValue: mockAppointmentService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add an appointment and navigate to /calendar', () => {
    expect(mockAppointmentService.addAppointment).toHaveBeenCalledWith(jasmine.any(Appointment));

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/calendar']);
  });
});
