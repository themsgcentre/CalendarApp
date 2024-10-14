import { TestBed } from '@angular/core/testing';
import { AppointmentService } from './appointment.service';
import { Appointment } from '../models/appointment';

describe('AppointmentService', () => {
  let service: AppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentService);
  });

  describe('addAppointment', () => {
    it('should add a new appointment', () => {
      const appointment: Appointment = {
        id: 1,
        title: 'Test Appointment',
        date: new Date('2024-10-15'),
        time: '10:00 AM',
        description: 'This is a test appointment.'
      };
      service.addAppointment(appointment);
      service.getAllAppointments().subscribe(appointments => {
        expect(appointments.length).toBe(1);
        expect(appointments[0]).toEqual(appointment);
      });
    });

    it('should update an existing appointment', () => {
      const appointment: Appointment = {
        id: 1,
        title: 'Test Appointment',
        date: new Date('2024-10-15'),
        time: '10:00 AM',
        description: 'This is a test appointment.'
      };
      service.addAppointment(appointment);

      const updatedAppointment: Appointment = {
        id: 1,
        title: 'Updated Appointment',
        date: new Date('2024-10-16'),
        time: '11:00 AM',
        description: 'This is an updated test appointment.'
      };
      service.addAppointment(updatedAppointment);

      service.getAllAppointments().subscribe(appointments => {
        expect(appointments.length).toBe(1);
        expect(appointments[0]).toEqual(updatedAppointment);
      });
    });
  });

  describe('removeAppointment', () => {
    it('should remove an existing appointment', () => {
      const appointment: Appointment = {
        id: 1,
        title: 'Test Appointment',
        date: new Date('2024-10-15'),
        time: '10:00 AM',
        description: 'This is a test appointment.'
      };
      service.addAppointment(appointment);
      service.removeAppointment(appointment);

      service.getAllAppointments().subscribe(appointments => {
        expect(appointments.length).toBe(0);
      });
    });

    it('should not remove a non-existing appointment', () => {
      const appointment1: Appointment = {
        id: 1,
        title: 'Test Appointment 1',
        date: new Date('2024-10-15'),
        time: '10:00 AM',
        description: 'This is a test appointment 1.'
      };
      const appointment2: Appointment = {
        id: 2,
        title: 'Test Appointment 2',
        date: new Date('2024-10-16'),
        time: '11:00 AM',
        description: 'This is a test appointment 2.'
      };

      service.addAppointment(appointment1);
      service.removeAppointment(appointment2); // Try to remove a non-existing appointment

      service.getAllAppointments().subscribe(appointments => {
        expect(appointments.length).toBe(1);
        expect(appointments[0]).toEqual(appointment1);
      });
    });
  });

  describe('getNumberOfAppointments', () => {
    it('should return the correct number of appointments', () => {
      const appointment: Appointment = {
        id: 1,
        title: 'Test Appointment',
        date: new Date('2024-10-15'),
        time: '10:00 AM',
        description: 'This is a test appointment.'
      };
      service.addAppointment(appointment);
      expect(service.getNumberOfAppointments()).toBe(1);
    });
  });

  describe('getFilteredAppointments', () => {
    it('should return all appointments if no filters are applied', (done) => {
      const appointment: Appointment = {
        id: 1,
        title: 'Test Appointment',
        date: new Date('2024-10-15'),
        time: '10:00 AM',
        description: 'This is a test appointment.'
      };
      service.addAppointment(appointment);

      service.getFilteredAppointments().subscribe(appointments => {
        expect(appointments.length).toBe(1);
        expect(appointments[0]).toEqual(appointment);
        done();
      });
    });

    it('should return filtered appointments based on the applied dates', (done) => {
      const appointment1: Appointment = {
        id: 1,
        title: 'Test Appointment 1',
        date: new Date('2024-10-15'),
        time: '10:00 AM',
        description: 'This is a test appointment 1.'
      };
      const appointment2: Appointment = {
        id: 2,
        title: 'Test Appointment 2',
        date: new Date('2024-10-16'),
        time: '11:00 AM',
        description: 'This is a test appointment 2.'
      };
      service.addAppointment(appointment1);
      service.addAppointment(appointment2);
      
      service.addFilter(new Date('2024-10-15'));

      service.getFilteredAppointments().subscribe(appointments => {
        expect(appointments.length).toBe(1);
        expect(appointments[0]).toEqual(appointment1);
        done();
      });
    });
  });

  describe('addFilter', () => {
    it('should add a filter date', () => {
      const filterDate = new Date('2024-10-15');
      service.addFilter(filterDate);
      service.isFiltered().subscribe(isFiltered => {
        expect(isFiltered).toBeTruthy();
      });
    });
  });

  describe('removeFilter', () => {
    it('should remove a filter date', () => {
      const filterDate = new Date('2024-10-15');
      service.addFilter(filterDate);
      service.removeFilter(filterDate);

      service.isFiltered().subscribe(isFiltered => {
        expect(isFiltered).toBeFalsy();
      });
    });
  });

  describe('clearFilter', () => {
    it('should clear all filter dates', () => {
      const filterDate1 = new Date('2024-10-15');
      const filterDate2 = new Date('2024-10-16');
      service.addFilter(filterDate1);
      service.addFilter(filterDate2);
      service.clearFilter();

      service.isFiltered().subscribe(isFiltered => {
        expect(isFiltered).toBeFalsy();
      });
    });
  });

  describe('clearAll', () => {
    it('should clear all appointments', () => {
      const appointment: Appointment = {
        id: 1,
        title: 'Test Appointment',
        date: new Date('2024-10-15'),
        time: '10:00 AM',
        description: 'This is a test appointment.'
      };
      service.addAppointment(appointment);
      service.clearAll();

      service.getAllAppointments().subscribe(appointments => {
        expect(appointments.length).toBe(0);
      });
    });
  });
});
