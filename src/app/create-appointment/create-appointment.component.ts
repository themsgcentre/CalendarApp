import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss'
})
export class CreateAppointmentComponent {
  constructor(private router: Router) {}
  public appointment = {
    date: '',
    time: '',
    title: '',
    description: '',
  };
  public onSubmit(): void {
    this.router.navigate(['/save'], { queryParams: { Title: this.appointment.title, description: this.appointment.description, date: this.appointment.date, time: this.appointment.time } });
  }
}
