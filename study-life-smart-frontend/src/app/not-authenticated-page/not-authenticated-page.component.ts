import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-authenticated-page',
  templateUrl: './not-authenticated-page.component.html',
  styleUrls: ['./not-authenticated-page.component.css']
})
export class NotAuthenticatedPageComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  routeToRegister() {
    this.router.navigate(['register']);
  }

}
