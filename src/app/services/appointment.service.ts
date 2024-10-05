import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
  private appointments$ = this.appointmentsSubject.asObservable();
  private filterSubject$ = new BehaviorSubject<Date[]>([]);
  private filter$ = this.filterSubject$.asObservable();

  constructor() { }

  public clearAll(): void {
    this.appointmentsSubject.next([]);
  }

  public addAppointment(appointment: Appointment): void {
    const currentAppointments = this.appointmentsSubject.value;
    this.appointmentsSubject.next([...currentAppointments, appointment]);
  }

  public removeAppointment(appointment: Appointment): void {
    const currentAppointments = this.appointmentsSubject.value;
    const filteredAppointments = currentAppointments.filter(app => app !== appointment);
    this.appointmentsSubject.next(filteredAppointments);
  }

  public getAppointments(): Observable<Appointment[]> {
    return combineLatest([this.appointments$, this.filter$]).pipe(
      map(([appointments, filterDates]) => {
        if (filterDates.length === 0) {
          return appointments;
        }
        return appointments.filter(appointment => this.isInDates(appointment.date, filterDates));
      })
    );
  }

  public setFilter(dates: Date[]): void {
    this.filterSubject$.next(dates);
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
