import { CalendarDay } from "./calendar-day";

export class CalendarWeek {
  constructor(public calenderWeek: number, public days: CalendarDay[]) {}
}
