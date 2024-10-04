import { CalendarWeek } from "./calendar-week";

export class CalendarMonth {
  constructor(public monthName: string, public moment: Date, public weeks: CalendarWeek[]) {}
}
