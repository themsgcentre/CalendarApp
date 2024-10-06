import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';
import { CalendarDay } from '../models/calendar-day';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  filteredAppointments$: Observable<Appointment[]> = new Observable<Appointment[]>;
  appointments$: Observable<Appointment[]> = new Observable<Appointment[]>;
  isFiltered$: Observable<boolean> = new Observable<boolean>;
  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.filteredAppointments$ = this.appointmentService.getFilteredAppointments();
    this.appointments$ = this.appointmentService.getAllAppointments();
    this.isFiltered$ = this.appointmentService.isFiltered();
  }

  onDaySelected(day: CalendarDay) {
    this.appointmentService.addFilter(day.date);
  }

  onDayUnselected(day: CalendarDay) {
    this.appointmentService.removeFilter(day.date);
  }

  filterRemoved() {
    this.appointmentService.clearFilter();
  }

  deleteAppointment(appointment: Appointment) {
    this.appointmentService.removeAppointment(appointment);
  }
}
