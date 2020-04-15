import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComServiceService {
  loginLevel: BehaviorSubject<number>;
  isloggedIn: BehaviorSubject<boolean>;

  credentials = {
    admin: {
      username: 'admin',
      password: '123'
    },
    modification: {
      username: 'modification',
      password: '123'
    },
    accident: {
      username: 'accident',
      password: '123'
    }
  }

  rootUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
    this.loginLevel = new BehaviorSubject<number>(0);
    this.isloggedIn = new BehaviorSubject<boolean>(false);
  }

  getAllVehicles() {
    const url = this.rootUrl + 'queryAll';
    return this.http.post(url, {});
  }

  searchVehicle(carId) {
    const url = this.rootUrl + 'queryVehicle';
    return this.http.post(url, { carId });
  }

  addNewVehicle(carObj) {
    const url = this.rootUrl + 'newVehicle';
    return this.http.post(url, {carObj});
  }

  updateVehicle(carObj) {
    const url = this.rootUrl + 'editVehicle';
    return this.http.post(url, {carObj});
  }

  sendHistoryReq(carId) {
    const url = this.rootUrl + 'history';
    return this.http.post(url, { carId });
  }

  login(loginId, passowrd) {
    this.isloggedIn.next(true);

    if (loginId === this.credentials.admin.username && passowrd === this.credentials.admin.password) {
      this.loginLevel.next(1);
    } else if (loginId === this.credentials.modification.username && passowrd === this.credentials.modification.password) {
      this.loginLevel.next(2);
    } else if (loginId === this.credentials.accident.username && passowrd === this.credentials.accident.password) {
      this.loginLevel.next(3);
    }
  }

  getLogLevel(): Observable<number>{
    return this.loginLevel.asObservable();
  }

  getLoginStatus(): Observable<boolean>{
    return this.isloggedIn.asObservable();
  }

  setLogout() {
    this.isloggedIn.next(false);
    this.loginLevel.next(0);
  }

}
