import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  constructor() { }
  appointments: Appointment[] = [];

  public clearAll(): void {
    this.appointments = [];
  }

  public addAppointment(appointment: Appointment): void {
    this.appointments.push(appointment);
  }

  public removeAppointment(appointment: Appointment): void {
    this.appointments = this.appointments.filter(app => app !== appointment);
  }

  public getAllAppointments(): Appointment[] {
    return this.appointments;
  }

  public getAppointmentsForDates(dates: Date[]) {
    let appointmentsInDate: Appointment[] = [];
    this.appointments.forEach(appointment => {
      dates.forEach(date => {
        if(appointment.date === date) {
          appointmentsInDate.push(appointment);
        }
      });
    });
    return appointmentsInDate;
  }
}
