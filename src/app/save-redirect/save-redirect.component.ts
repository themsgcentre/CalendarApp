import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-save-redirect',
  templateUrl: './save-redirect.component.html',
  styleUrl: './save-redirect.component.scss'
})
export class SaveRedirectComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private appointmentService: AppointmentService) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const appointment = new Appointment(params['id'], new Date(params['date']), params['time'], params['title'], params['description']);
      this.appointmentService.addAppointment(appointment);
      this.router.navigate(['/calendar']);
    });
  }
}
