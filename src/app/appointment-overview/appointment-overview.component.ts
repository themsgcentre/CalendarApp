import { Component, Input } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-overview',
  templateUrl: './appointment-overview.component.html',
  styleUrl: './appointment-overview.component.scss'
})
export class AppointmentOverviewComponent {
  @Input()
  appointments: Appointment[] = [];
}
