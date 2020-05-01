import { Component, OnInit } from '@angular/core';
import { ComServiceService } from '../services/com-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history-comp',
  templateUrl: './history-comp.component.html',
  styleUrls: ['./history-comp.component.scss']
})
export class HistoryCompComponent implements OnInit {
  carId = '';
  vehicleArray = [];
  constructor(private service: ComServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('carId');

    this.service.sendHistoryReq(this.carId).subscribe((result: any) => {
      let state = result.length;

      result.forEach(element => {
        element['state'] = state
        this.vehicleArray.push(element);
        state--;
      });
    });
  }

}
