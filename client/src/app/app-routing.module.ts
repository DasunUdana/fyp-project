import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccidentCompComponent } from './accident-comp/accident-comp.component';
import { ModificationCompComponent } from './modification-comp/modification-comp.component';
import { HistoryCompComponent } from './history-comp/history-comp.component';

const routes: Routes = [
  { path: '', component: ViewVehicleComponent },
  { path: 'vehicle', component: ViewVehicleComponent, redirectTo: ''},
  { path: 'add', component: AddVehicleComponent },
  { path: 'edit', component: EditVehicleComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'accident', component: AccidentCompComponent },
  { path: 'modification', component: ModificationCompComponent },
  { path: 'history/:carId', component: HistoryCompComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
