import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss'
})
export class CreateAppointmentComponent {
  constructor(private router: Router) {}
  
  public submittedAppointment(appointment: Appointment): void {
    this.router.navigate(['/save'], { queryParams: { title: appointment.title, description: appointment.description, date: appointment.date, time: appointment.time, id: appointment.id } });
  }
}
