import { Component, OnInit, Input } from '@angular/core';
import { vehicle } from '../vehicle';

@Component({
  selector: 'app-detailed-vehicle',
  templateUrl: './detailed-vehicle.component.html',
  styleUrls: ['./detailed-vehicle.component.scss']
})

export class DetailedVehicleComponent implements OnInit {

  @Input('vehicleObj') vehicle: vehicle;

  constructor() { }

  ngOnInit(): void {
  }

}
