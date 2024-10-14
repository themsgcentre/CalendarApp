import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAppointmentComponent } from './edit-appointment.component';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms'; 

describe('EditAppointmentComponent', () => {
  let component: EditAppointmentComponent;
  let fixture: ComponentFixture<EditAppointmentComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditAppointmentComponent,
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

    fixture = TestBed.createComponent(EditAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the appointment with route parameters', () => {
    expect(component.appointment).toBeDefined();
    expect(component.appointment?.id).toBe(1);
    expect(component.appointment?.date.toLocaleDateString('en-CA')).toBe('2024-10-14');
    expect(component.appointment?.title).toBe('Test Appointment');
    expect(component.appointment?.time).toBe('10:00');
    expect(component.appointment?.description).toBe('Test description');
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

