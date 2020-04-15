import { Component, OnInit } from '@angular/core';
import { vehicle } from '../vehicle';
import { ComServiceService } from '../services/com-service.service';

@Component({
  selector: 'app-modification-comp',
  templateUrl: './modification-comp.component.html',
  styleUrls: ['./modification-comp.component.scss']
})

export class ModificationCompComponent implements OnInit {
  vehicleSearch = '';
  vehicle: vehicle = new vehicle();
  m1 = '';

  msgType = '';
  responseMsg = '';

  isDisableUpdateButton = true;

  constructor(private service: ComServiceService) { }

  ngOnInit(): void {}

  onSearch() : void {
    this.msgType = '';
    this.responseMsg = '';

    if (this.vehicleSearch && this.vehicleSearch !== '' && this.vehicleSearch.length === 7) {
      this.service.searchVehicle(this.vehicleSearch).subscribe(async (result: any) => {

        if (result) {
          this.vehicle = {...this.vehicle, ...result};
          this.isDisableUpdateButton = false;
        }
      });
    } else {
      this.msgType = 'error';
      this.responseMsg = 'Invalid vehicleNo';
    }
  }

  onSubmit(): void {
    this.responseMsg = '';
    this.msgType = '';
  
    if (!this.m1 || this.m1 === '') {
      this.responseMsg = 'Accident details cannot be empty';
      this.msgType = 'error';
      return;
    }

    let vehicleObj = Object.assign({}, this.vehicle);
    let modificationArray = Object.assign([], this.vehicle.modifications);

    modificationArray.push(this.m1);
    vehicleObj.modifications = modificationArray;

    this.service.updateVehicle(vehicleObj).subscribe((result: any) => {
      if (result.lincenseNo === vehicleObj.lincenseNo) {
        this.responseMsg = 'Successfully updated';
        this.msgType = 'succes';
        this.clearForm();
        this.vehicle = {...this.vehicle, ...result};
      } else {
        this.responseMsg = 'Vehicle updating failed';
        this.msgType = 'error';
      }
    });
  }

  clearForm(): void {
    this.vehicleSearch = '';
    this.m1 = '';
  }
}
