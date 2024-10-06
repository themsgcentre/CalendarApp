import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrl: './edit-appointment.component.scss'
})
export class EditAppointmentComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  appointment: Appointment | undefined;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      const title = params['title'];
      const date = new Date(params['date']);
      const time = params['time'];
      const description = params['description'];
      this.appointment = new Appointment(id, date, time, title, description);
    });
  }

  public submittedAppointment(appointment: Appointment): void {
    this.router.navigate(['/save'], { queryParams: { title: appointment.title, description: appointment.description, date: appointment.date, time: appointment.time, id: appointment.id } });
  }
}
