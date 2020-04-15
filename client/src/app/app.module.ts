import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavPanelComponent } from './nav-panel/nav-panel.component';
import { HomeComponent } from './home/home.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DetailedVehicleComponent } from './detailed-vehicle/detailed-vehicle.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AccidentCompComponent } from './accident-comp/accident-comp.component';
import { ModificationCompComponent } from './modification-comp/modification-comp.component';
import { HistoryCompComponent } from './history-comp/history-comp.component';

@NgModule({
  declarations: [
    AppComponent,
    NavPanelComponent,
    HomeComponent,
    ViewVehicleComponent,
    AddVehicleComponent,
    EditVehicleComponent,
    RegisterComponent,
    LoginComponent,
    DetailedVehicleComponent,
    AccidentCompComponent,
    ModificationCompComponent,
    HistoryCompComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
