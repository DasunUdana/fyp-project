import { Component, OnInit } from '@angular/core';
import { ComServiceService } from '../services/com-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.scss']
})
export class NavPanelComponent implements OnInit {
  logLevel: any;
  isLoggedIn: any;
  constructor(private service: ComServiceService) { }

  ngOnInit(): void {
    this.service.getLogLevel().subscribe((value) => {
      this.logLevel = value;
    });

    this.service.getLoginStatus().subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  onLogout() {
    // this.service.setLogout();
    location.reload();
  }
}
