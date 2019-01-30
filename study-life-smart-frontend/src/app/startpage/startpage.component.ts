import { AuthentificationService } from './../authentification-service/authentification.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {
  constructor(private authServ: AuthentificationService, private router: Router) { }

  ngOnInit() {
  }
  getauthStatus(): boolean {
    return this.authServ.isAuthenticated();
  }
  logout() {
    this.authServ.logout();
  }
  loginAction(username, password) {
    this.authServ.authenticate(username, password);
  }
  routeToRegister() {
    this.router.navigate(['register']);
  }
}
