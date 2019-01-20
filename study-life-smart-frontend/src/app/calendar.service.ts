import { AuthentificationService } from './authentification-service/authentification.service';
import { Injectable } from '@angular/core';
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
export class CalendarService {
  constructor(private http: HttpClient, private authServ: AuthentificationService) { }
  private calendarserverURL = 'http://localhost:7000';
  public timetbl;
  loadUserSpecificCalendar() {
    this.http.get(this.calendarserverURL + '/getTimeTable/' + this.authServ.getUsername()).subscribe( (data) => {
      this.timetbl = data;
    });
  }
  UpdateUserSpecificCalendar(calendar: string): Observable<any> {
    return this.http.post(this.calendarserverURL + '/registerTimeTable/' + this.authServ.getUsername(), {'ics': calendar}, httpOptions );
  }
  getUserSpecificCalendar(): Observable<any> {
    return this.http.get(this.calendarserverURL + '/getTimeTable/' + this.authServ.getUsername());
  }
}
