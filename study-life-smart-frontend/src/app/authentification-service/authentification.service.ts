import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor() { }
  private authenticationStatus: boolean;
  private username: string;
  public authenticate(user, pw): boolean {
    // ToDo http-request
    this.authenticationStatus = true;
    this.username = 'admin';
    return true;
  }
  public isAuthenticated(): boolean {
    return this.authenticationStatus;
  }
  public getUsername(): string {
    if ( this.authenticationStatus ) {
      return this.username;
    }
  }
}
