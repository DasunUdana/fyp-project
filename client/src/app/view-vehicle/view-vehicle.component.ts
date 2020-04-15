import { Component, OnInit, assertPlatform } from '@angular/core';
import { vehicle } from '../vehicle';
import { ComServiceService } from '../services/com-service.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.scss']
})

export class ViewVehicleComponent implements OnInit {

  vehicleSearch = '';
  vehicleArray: vehicle[] = [];
  errorMsg = ''
  showHistoryButton = false;

  constructor(private service: ComServiceService) { 
    
  }

  ngOnInit(): void {
    this.service.getAllVehicles().subscribe(async (result: any[]) => {
      result.forEach(element => {
        this.vehicleArray.push(element.Record);
      });
    });
  }

  onSearch() : void {
    this.errorMsg = '';

    if (this.vehicleSearch && this.vehicleSearch !== '' && this.vehicleSearch.length === 7) {
      this.vehicleArray = [];

      this.service.searchVehicle(this.vehicleSearch).subscribe(async (result: any) => {
        this.vehicleArray.push(result);
        this.showHistoryButton = true;
      });
    } else {
      this.errorMsg = 'Invalid vehicleNo';
    }
  }
}
