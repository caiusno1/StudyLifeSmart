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
    return this.username !== '';
  }
  public getUsername(): string {
    if ( this.authenticationStatus ) {
      return this.username;
    }
  }
}
