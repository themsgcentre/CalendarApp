import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentFormComponent } from './appointment-form.component';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';

describe('AppointmentFormComponent', () => {
  let component: AppointmentFormComponent;
  let fixture: ComponentFixture<AppointmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: AppointmentService, useValue: { getNumberOfAppointments: () => 1 } } 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
