import { Component, OnInit } from '@angular/core';
import { ComServiceService } from '../services/com-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(private service: ComServiceService, private router: Router) { }

  ngOnInit(): void {}

  onSubmit(): void{
    this.service.login(this.username, this.password);
    this.username = '';
    this.password = '';
    this.router.navigate(['/vehicle']);
  }
}
