import { Component, OnInit } from '@angular/core';
import { ComServiceService } from '../services/com-service.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  license = '';
  make = '';
  model = '';
  color = '';
  engineNo = '';
  ownerName = '';
  ownerNationalId = '';
  registeredProvince = '';
  responseMsg = '';
  msgType = '';

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
      accidents: [], 
      modifications: [], 
    };

    this.service.addNewVehicle(vehicleObj).subscribe((result: any) => {
      if (result.lincenseNo === vehicleObj.lincenseNo) {
        this.responseMsg = 'Successfully added';
        this.msgType = 'succes';
        this.clearForm();
      } else {
        this.responseMsg = 'Vehicle adding failed';
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
