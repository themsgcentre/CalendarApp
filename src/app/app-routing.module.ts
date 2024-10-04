import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';

const routes: Routes = [
  { path: 'calendar', component: MainComponent},
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: 'create/:year/:month/:day', component: CreateAppointmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
