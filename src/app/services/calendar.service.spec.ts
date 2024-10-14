import { TestBed } from '@angular/core/testing';
import { CalendarService } from './calendar.service';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarService);
  });

  describe('getBeginningOfMonth', () => {
    it('should return the beginning of the month', () => {
      const date = new Date(Date.UTC(2024, 0, 15));
      const beginningOfMonth = service['getBeginningOfMonth'](date);
      expect(beginningOfMonth.toLocaleDateString('en-CA')).toEqual('2024-01-01');
    });
  });

  describe('getActualMonthValues', () => {
    it('should return an array of CalendarDay for the actual month', () => {
      const date = new Date(2024, 0, 15);
      const actualDays = service['getActualMonthValues'](date);
      expect(actualDays.length).toBe(31); 
      expect(actualDays[0].date.getDate()).toBe(1); 
      expect(actualDays[30].date.getDate()).toBe(31);
    });
  });

  describe('getPreviousMonthValues', () => {
    it('should return the previous month values as CalendarDay array', () => {
      const date = new Date(Date.UTC(2024, 1, 1)); 
      const previousMonthDays = service['getPreviousMonthValues'](date);
      expect(previousMonthDays.length).toBe(3); 
      expect(previousMonthDays[0].date.getDate()).toBe(29); 
      expect(previousMonthDays[1].date.getDate()).toBe(30); 
      expect(previousMonthDays[2].date.getDate()).toBe(31); 
    });
  });

  describe('getNextMonthValues', () => {
    it('should return the next month values as CalendarDay array', () => {
      const date = new Date(2024, 0, 31);
      const nextDays = service['getNextMonthValues'](date, 31); 
      expect(nextDays.length).toBe(11); 
      expect(nextDays[0].date.getDate()).toBe(1); 
      expect(nextDays[10].date.getDate()).toBe(11); 
    });
  });
});
