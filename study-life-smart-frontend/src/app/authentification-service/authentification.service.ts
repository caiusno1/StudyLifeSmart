import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private router: Router) {}
  private authenticationStatus: boolean;
  private username: string;
  public authenticate(user, pw): boolean {
    // ToDo http-request
    this.authenticationStatus = true;
    this.username = user;
    return true;
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
