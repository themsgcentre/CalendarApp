import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms'; 
import { CreateAppointmentComponent } from './create-appointment.component';

describe('CreateAppointmentComponent', () => {
  let component: CreateAppointmentComponent;
  let fixture: ComponentFixture<CreateAppointmentComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateAppointmentComponent,
        AppointmentFormComponent 
      ],
      imports: [FormsModule], 
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 1,
              title: 'Test Appointment',
              date: '2024-10-14',
              time: '10:00',
              description: 'Test description'
            })
          }
        },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate on submittedAppointment', () => {
    const testAppointment = {
      id: 1,
      title: 'Test Appointment',
      date: new Date('2024-10-14'),
      time: '10:00',
      description: 'Test description'
    };
    component.submittedAppointment(testAppointment);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/save'], { queryParams: { title: 'Test Appointment', description: 'Test description', date: testAppointment.date, time: '10:00', id: 1 } });
  });
});

