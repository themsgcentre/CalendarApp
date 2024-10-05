import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor() { }
  private appointmentsSubject$ = new BehaviorSubject<Appointment[]>([]);
  private filterSubject$ = new BehaviorSubject<Date[]>([]);
  private appointments: Appointment[] = [];

  public clearAll(): void {
    this.appointmentsSubject$.next([]);
  }

  public addAppointment(appointment: Appointment): void {
    this.appointments.push(appointment);
    this.appointmentsSubject$.next(this.appointments);
  }

  public setFilter(dates: Date[]): void {
    this.filterSubject$.next(dates);
  }

  public removeAppointment(appointment: Appointment): void {
    this.appointments = this.appointments.filter(app => app !== appointment);
    this.appointmentsSubject$.next(this.appointments);
  }

  public getAppointments(): Observable<Appointment[]> {
    return combineLatest([this.appointmentsSubject$, this.filterSubject$]).pipe(
      map(([apps, dateFilter]) => {
        if (!dateFilter || dateFilter.length === 0) {
          return apps;
        } else {
          return apps.filter(
            (appointment) => this.isInDates(appointment.date, dateFilter)
          );
        }
      })
    );
  }

  private isInDates(appointmentDate: Date, targetDates: Date[]): boolean {
    if (!appointmentDate) return false;
    for (let i = 0; i < targetDates.length; i++) {
      if (appointmentDate.toDateString() === targetDates[i].toDateString()) {
        return true;
      }
    }
    return false;
  }  
}
