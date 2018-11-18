import { AuthentificationService } from './../authentification-service/authentification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {
  constructor(private authServ: AuthentificationService) { }

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
}
