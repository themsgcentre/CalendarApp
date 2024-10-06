import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointments: Appointment[] = [];
  private appointmentsSubject$ = new BehaviorSubject<Appointment[]>([]);
  private appointments$ = this.appointmentsSubject$.asObservable();
  private filter: Date[] = [];
  private filterSubject$ = new BehaviorSubject<Date[]>([]);
  private filter$ = this.filterSubject$.asObservable();

  constructor() { }

  public clearAll(): void {
    this.appointments = [];
    this.appointmentsSubject$.next([]);
  }

  public addAppointment(appointment: Appointment): void {
    let exists = false;
    this.appointments.forEach(app => {
      if(app.id === appointment.id) {
        app.date = appointment.date;
        app.time = appointment.time;
        app.title = appointment.title;
        app.description = appointment.description;
        exists = true;
      }
    });
    if(!exists) {
      this.appointments.push(appointment)
    }
    this.appointmentsSubject$.next([...this.appointments]);  
  }

  public removeAppointment(appointment: Appointment): void {
      this.appointments = this.appointments.filter(app => app !== appointment); 
      this.appointmentsSubject$.next([...this.appointments]); 
  }

  public getNumberOfAppointments(): number {
    return this.appointments.length;
  }

  public getFilteredAppointments(): Observable<Appointment[]> {
    return combineLatest([this.appointments$, this.filter$]).pipe(
      map(([appointments, filterDates]) => {
        if (filterDates.length === 0) {
          return appointments;
        }
        return appointments.filter(appointment => this.isInDates(appointment.date, filterDates));
      })
    );
  }

  public getAllAppointments(): Observable<Appointment[]> {
    return this.appointments$;
  }

  public addFilter(date: Date): void {
    this.filter.push(date);
    this.filterSubject$.next(this.filter);
  }

  public removeFilter(date: Date) {
    const currentFilter = this.filter;
    const filtered = currentFilter.filter(dat => dat !== date);
    this.filter = filtered;
    this.filterSubject$.next(filtered);
  }

  public clearFilter() {
    this.filter = [];
    this.filterSubject$.next(this.filter);
  }

  public isFiltered(): Observable<boolean> {
    return this.filter$.pipe(
      map(dates => dates.length > 0)
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
