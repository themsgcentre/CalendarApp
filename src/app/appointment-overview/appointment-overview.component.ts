import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appointment } from '../models/appointment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-overview',
  templateUrl: './appointment-overview.component.html',
  styleUrl: './appointment-overview.component.scss'
})
export class AppointmentOverviewComponent {
  constructor(private router: Router) {}
  @Input() appointments: Appointment[] = [];
  @Input() filtered: boolean = false;
  @Output() removeFilter = new EventEmitter();
  @Output() deleteAppointment = new EventEmitter<Appointment>();

  editAppointment(appointment: Appointment) {
    const dateStr = appointment.date.toLocaleDateString('en-CA');
    this.router.navigate([
      "/edit",
      appointment.id,
      appointment.title,
      dateStr,
      appointment.time,
      appointment.description
    ]);
  }
}
