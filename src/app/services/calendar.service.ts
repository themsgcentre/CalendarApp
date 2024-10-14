import { Injectable } from '@angular/core';
import { CalendarDay } from '../models/calendar-day';
import { CalendarMonth } from '../models/calendar-month';
import {
  addDays,
  addMonths,
  getDaysInMonth,
  isToday,
  subDays,
} from 'date-fns';
import { CalendarWeek } from '../models/calendar-week';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor() { }
  daysInMonthOverview = 42;

  getMonth(offset: number, filter: Date[]): CalendarMonth {
      let month: CalendarMonth;

      const currentMoment = addMonths(Date.now(), offset);
      month = this.createMonth(currentMoment);
      const previousMonthDays = this.getPreviousMonthValues(currentMoment);
      const actualMonthDays = this.getActualMonthValues(currentMoment);
      const nextMonthDays = this.getNextMonthValues(currentMoment, previousMonthDays.length + actualMonthDays.length);
      month.weeks = this.getCalendarWeeks([
        ...previousMonthDays,
        ...actualMonthDays,
        ...nextMonthDays,
      ]);

    return month;
  };

  private createMonth(moment: Date): CalendarMonth {
    const monthName = moment.toLocaleString('en', { month: 'long' });

    return new CalendarMonth(monthName, moment, []);
  }

  private getCalendarWeeks(days: CalendarDay[]): CalendarWeek[] {
    const weeks: CalendarWeek[] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(new CalendarWeek(this.getWeekNumber(days.slice(i, i + 7)), days.slice(i, i + 7)));
    }
    return weeks;
  }

  private getWeekNumber(weekDays: CalendarDay[]): number {
    const tempDate = new Date(weekDays[0].date.getTime());
    tempDate.setDate(tempDate.getDate() + (4 - (tempDate.getDay() || 7)));
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    return Math.ceil(((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

  private getPreviousMonthValues(currentMoment: Date): CalendarDay[] {
    const beginningOfMonth = this.getBeginningOfMonth(currentMoment);
    let weekDayOfFirstOfMonth = beginningOfMonth.getDay();
    const previousMonth: CalendarDay[] = [];

    if (weekDayOfFirstOfMonth === 0) {
      weekDayOfFirstOfMonth = 7;
    }

    for (let dayOfWeek = weekDayOfFirstOfMonth - 1; dayOfWeek > 0; dayOfWeek--) {
      const day = subDays(beginningOfMonth, dayOfWeek);
      const calendarDay = new CalendarDay(day, isToday(day), false, false);
      previousMonth.push(calendarDay);
    }

    return previousMonth;
  }

  private getActualMonthValues(currentMoment: Date): CalendarDay[] {
    const daysInActualMonth = getDaysInMonth(currentMoment);
    const firstDayOfMonth = this.getBeginningOfMonth(currentMoment);
    const actualDays: CalendarDay[] = [];

    for (let day = 0; day < daysInActualMonth; day++) {
      const currentDate = addDays(firstDayOfMonth, day);
      const calendarDay = new CalendarDay(currentDate, isToday(currentDate), true, false);
      actualDays.push(calendarDay);
    }

    return actualDays;
  }

  private getBeginningOfMonth(date: Date): Date {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), 1);
  }

  private getNextMonthValues(currentMoment: Date, filledUpDays: number) {
    const nextDays: CalendarDay[] = [];
    const beginningOfNextMonth = this.getBeginningOfMonth(addMonths(currentMoment, 1));

    for (let day = 0; day < this.daysInMonthOverview - filledUpDays; day++) {
      const currentDate = addDays(beginningOfNextMonth, day);
      const calendarDay = new CalendarDay(currentDate, isToday(currentDate), false, false);
      nextDays.push(calendarDay);
    }
    return nextDays;
  }
}
