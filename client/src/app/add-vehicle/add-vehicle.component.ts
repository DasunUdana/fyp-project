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

  constructor(private service: ComServiceService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

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
        this.service.setNotification('succes', 'Successfully added');

        this.clearForm();
      } else {
        this.service.setNotification('error', 'Vehicle adding failed');
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
    let isValid = true;

    if (!this.license || this.license === '' || this.license.length !== 7) {
      isValid = false;
      this.service.setNotification('error', 'Invalid vehicleNo');
    }

    if (this.make === '' || this.model === '' || this.color === '' || this.engineNo === '' || this.ownerName === '' || this.ownerNationalId === '' || this.registeredProvince === '') {
      isValid = false;
      this.service.setNotification('error', 'All fields are mandetory. Please provide adequate information');
    }

    return isValid;
  }

}
