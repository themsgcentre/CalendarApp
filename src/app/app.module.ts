import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MonthComponent } from './month/month.component';
import { CalendarWeekComponent } from './calendar-week/calendar-week.component';
import { CalendarDayComponent } from './calendar-day/calendar-day.component';
import { MainComponent } from './main/main.component';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { SaveRedirectComponent } from './save-redirect/save-redirect.component';
import { AppointmentOverviewComponent } from './appointment-overview/appointment-overview.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MonthComponent,
    CalendarWeekComponent,
    CalendarDayComponent,
    MainComponent,
    MonthPickerComponent,
    CreateAppointmentComponent,
    SaveRedirectComponent,
    AppointmentOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
