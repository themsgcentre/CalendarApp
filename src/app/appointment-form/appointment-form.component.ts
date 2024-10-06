import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss'
})
export class AppointmentFormComponent implements OnInit {
  @Output() submit = new EventEmitter<Appointment>();
  @Input() appointment: Appointment | undefined;

  constructor(private appointmentService: AppointmentService) {}

  public appointmentModel = {
    date: '',
    time: '',
    title: '',
    description: '',
  };

  ngOnInit(): void {
    if(this.appointment !== undefined) {
      this.appointmentModel.date = this.appointment.date.toISOString().split('T')[0];
      this.appointmentModel.time = this.appointment.time;
      this.appointmentModel.title = this.appointment.title;
      this.appointmentModel.description = this.appointment.description;
    }
  }

  submitted(form: NgForm) {
    if (form.invalid) {
      alert("Please fill out all fields.");
    }
    else {
      let id: number;
      if(this.appointment === undefined) {
        id = this.appointmentService.getNumberOfAppointments();
      }
      else {
        id = this.appointment.id;
      }
      const app = new Appointment(id, new Date(this.appointmentModel.date), this.appointmentModel.time, this.appointmentModel.title, this.appointmentModel.description);
      this.submit.emit(app);
    }
  }
}
