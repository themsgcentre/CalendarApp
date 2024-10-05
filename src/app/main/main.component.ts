import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  appointments$: Observable<Appointment[]> = new Observable<Appointment[]>;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointments$ = this.appointmentService.getAppointments();
  }
}
