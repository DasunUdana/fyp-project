import { Component, OnInit } from '@angular/core';
import { ComServiceService } from '../services/com-service.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})

export class EditVehicleComponent implements OnInit {
  vehicleSearch = '';
  license = '';
  make = '';
  model = '';
  color = '';
  engineNo = '';
  ownerName = '';
  ownerNationalId = '';
  registeredProvince = '';
  accidents = [];
  modifications = [];
  responseMsg = '';
  msgType = '';

  isDisableEdit = true;

  constructor(private service: ComServiceService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.responseMsg = '';

    if (!this.validateVehicleDetails()) {
      return;
    }

    let vehicleObj = {
      lincenseNo: this.license, 
      make: this.make, 
      model: this.model, 
      color: this.color, 
      engineNo: this.engineNo, 
      ownerName: this.ownerName, 
      ownerNationalId: this.ownerNationalId, 
      registeredProvince: this.registeredProvince, 
      accidents: this.accidents, 
      modifications: this.modifications, 
    };

    this.service.updateVehicle(vehicleObj).subscribe((result: any) => {
      if (result.lincenseNo === vehicleObj.lincenseNo) {
        this.responseMsg = 'Successfully updated';
        this.msgType = 'succes';
        this.clearForm();
      } else {
        this.responseMsg = 'Vehicle updating failed';
        this.msgType = 'error';
      }
    });
  }

  clearForm(): void {
    this.license = '';
    this.make = '';
    this.model = '';
    this.color = '';
    this.engineNo = '';
    this.ownerName = '';
    this.ownerNationalId = '';
    this.registeredProvince = '';
    this.accidents = [];
    this.modifications = [];
    this.vehicleSearch = '';
  }

  onSearch() : void {
    this.msgType = '';
    this.responseMsg = '';

    if (this.vehicleSearch && this.vehicleSearch !== '' && this.vehicleSearch.length === 7) {
      this.service.searchVehicle(this.vehicleSearch).subscribe(async (result: any) => {
        if (result) {
          this.license = result.lincenseNo;
          this.make = result.make;
          this.model = result.model;
          this.color = result.color;
          this.engineNo = result.engineNo;
          this.ownerName = result.ownerName;
          this.ownerNationalId = result.ownerNationalId;
          this.registeredProvince = result.registeredProvince;
          this.accidents = result.accidents;
          this.modifications = result.modifications;
          this.isDisableEdit = false;
        }
      });
    } else {
      this.msgType = 'error';
      this.responseMsg = 'Invalid vehicleNo';
    }
  }

  validateVehicleDetails(): boolean {
    this.msgType = 'error';
    let isValid = true;

    if (!this.license || this.license === '' || this.license.length !== 7) {
      isValid = false;
      this.responseMsg = 'Invalid vehicleNo';
    }

    if (this.make === '' || this.model === '' || this.color === '' || this.engineNo === '' || this.ownerName === '' || this.ownerNationalId === '' || this.registeredProvince === '') {
      isValid = false;
      this.responseMsg = 'All fields are mandetory. Please provide adequate information';
    }

    return isValid;
  }
}
