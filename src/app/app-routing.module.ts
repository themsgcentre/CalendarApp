import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { SaveRedirectComponent } from './save-redirect/save-redirect.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';

const routes: Routes = [
  { path: 'calendar', component: MainComponent},
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: 'create', component: CreateAppointmentComponent },
  { path: 'save', component: SaveRedirectComponent },
  { path: 'edit/:id/:title/:date/:time/:description', component: EditAppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
