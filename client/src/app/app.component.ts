import { Component, OnInit } from '@angular/core';
import { ComServiceService } from './services/com-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'my-app';
  isError = true;
  msg = '';
  notificationClass = 'notification-panel faster animated zoomOut';
  timer: any;

  constructor(private service: ComServiceService) { }

  ngOnInit(): void {
    this.service.getNotification().subscribe((msgObj) => {
      if (msgObj) {
        this.msg = msgObj.msg;
        this.isError = msgObj.type === 'error';
        this.notificationClass = 'notification-panel faster animated zoomIn';

        this.timer = setTimeout(() => {
          this.clearNotification();
        }, 5000);
      }
    });
  }

  clearNotification() {
    this.notificationClass = 'notification-panel faster animated zoomOut';
    this.isError = true;
    this.msg = '';
    this.timer = undefined;
  }
}
