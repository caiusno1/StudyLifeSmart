import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers : new HttpHeaders({
  'Content-Type':  'application/json'
})
};

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient, private router: Router) {}
  private authenticationStatus: boolean;
  private username: string;
  private authserverURL = 'http://localhost:4000';

  public authenticate(user, pw): boolean {
    // ToDo http-request
    console.log('sending POST with '+user+', '+pw+'...');
    var test = 'unauthenticated';
    //this.http.get("http://localhost:4000").subscribe((data) => {console.log(data)});
    test = this.http.post(this.authserverURL + '/users/authenticate', {'username':user, 'password':pw})
    .subscribe((data)=> {if(data=='authenticated') {
      this.authenticationStatus = true;
      this.username = user;
      console.log('authentication successful!');
      return true;
    } else {
      console.log('authentication failed!');
      return false;
    }});
    //console.log('authentication failed!');
    return false;
  }

  public logout(): boolean {
    // ToDo http-request
    this.authenticationStatus = false;
    this.username = '';
    return true;
  }

  public isAuthenticated(): boolean {
    this.authenticationStatus = this.username !== '';
    return (this.username !== '' && this.username !== undefined );
  }

  public checkAuthenticationAndRedirect(): boolean {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['notAuthenticated']);
      return false;
    }
  }

  public getUsername(): string {
    if ( this.authenticationStatus ) {
      return this.username;
    }
  }
}
