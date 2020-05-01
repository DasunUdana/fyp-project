import { Component, OnInit } from '@angular/core';
import { vehicle } from '../vehicle';
import { ComServiceService } from '../services/com-service.service';

@Component({
  selector: 'app-accident-comp',
  templateUrl: './accident-comp.component.html',
  styleUrls: ['./accident-comp.component.scss']
})
export class AccidentCompComponent implements OnInit {
  vehicleSearch = '';
  vehicle: vehicle = new vehicle();
  a1 = '';


  isDisableUpdateButton = true;

  constructor(private service: ComServiceService) { }

  ngOnInit(): void {}

  onSearch() : void {

    if (this.vehicleSearch && this.vehicleSearch !== '' && this.vehicleSearch.length === 7) {
      this.service.searchVehicle(this.vehicleSearch).subscribe(async (result: any) => {

        if (result) {
          this.vehicle = {...this.vehicle, ...result};
          this.isDisableUpdateButton = false;
        }
      });
    } else {
      this.service.setNotification('error', 'Invalid vehicleNo');
    }
  }

  onSubmit(): void {

    if (!this.a1 || this.a1 === '') {
      this.service.setNotification('error', 'Accident details cannot be empty');
      return;
    }

    let vehicleObj = Object.assign({}, this.vehicle);
    let accidentArray = Object.assign([], this.vehicle.accidents);

    accidentArray.push(this.a1);
    vehicleObj.accidents = accidentArray;

    this.service.updateVehicle(vehicleObj).subscribe((result: any) => {
      if (result.lincenseNo === vehicleObj.lincenseNo) {
        this.service.setNotification('succes', 'Successfully updated');

        this.clearForm();
        this.vehicle = {...this.vehicle, ...result}
      } else {
        this.service.setNotification('error', 'Vehicle updating failed');

      }
    });
  }

  clearForm(): void {
    this.vehicleSearch = '';
    this.a1 = '';
  }
}
