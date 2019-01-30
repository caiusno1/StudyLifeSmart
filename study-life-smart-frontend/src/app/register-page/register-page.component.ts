import { AuthentificationService } from './../authentification-service/authentification.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  private tried: boolean;

  constructor(private authServ: AuthentificationService, private router: Router) {this.authServ.resetRegisterStatus(); this.resetTryStatus();}

  ngOnInit() {
    this.authServ.resetRegisterStatus();
    this.resetTryStatus();
  }

  getRegisterStatus(): boolean {
    return this.authServ.getRegisterStatus();
  }

  getTryStatus(): boolean {
    return this.tried;
  }

  resetTryStatus() {
    this.tried = false;
  }

  registerAction(username, password) {
    this.tried = true;
    this.authServ.register(username, password);
  }

  routeToStart() {
    this.router.navigate(['']);
  }
}
