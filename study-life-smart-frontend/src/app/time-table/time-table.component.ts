import { CalendarService } from './../calendar.service';
import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
  public tbl;
  public file;
  constructor(public calServ: CalendarService) {
  }
  public importDocument(file) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.calServ.UpdateUserSpecificCalendar(<any>fileReader.result).subscribe( data => {
        this.calServ.getUserSpecificCalendar().subscribe( (tbl) => this.tbl = tbl); });
    };
    fileReader.readAsText(this.file);
  }
  public importICS(e) {
    this.file = e.target.files[0];
    this.importDocument(this.file);
  }

  ngOnInit() {
    this.calServ.getUserSpecificCalendar().subscribe( (data) => this.tbl = data);
  }

}
