import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
  // ical2json
  public temptbl = {
    'VERSION': '2.0',
    'PRODID': '-//Datenlotsen Informationssysteme GmbH//CampusNet//DE',
    'METHOD': 'PUBLISH',
    'BEGIN': [
      'VTIMEZONE',
      'STANDARD',
      'DAYLIGHT',
      'VEVENT',
      'VEVENT',
      'VEVENT',
      'VEVENT',
      'VEVENT',
      'VEVENT'
    ],
    'TZID': 'CampusNetZeit',
    'DTSTART': [
      '16011028T030000',
      '16010325T020000'
    ],
    'RRULE': [
      'FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10',
      'FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3'
    ],
    'TZOFFSETFROM': [
      '+0200',
      '+0100'
    ],
    'TZOFFSETTO': [
      '+0100',
      '+0200'
    ],
    'END': [
      'STANDARD',
      'DAYLIGHT',
      'VTIMEZONE',
      'VEVENT',
      'VEVENT',
      'VEVENT',
      'VEVENT',
      'VEVENT',
      'VEVENT',
      'VCALENDAR'
    ],
    'DTSTART;TZID=CampusNetZeit': [
      '20181217T090000',
      '20181217T110000',
      '20181217T140000',
      '20181217T160000',
      '20181220T080000',
      '20181220T110000'
    ],
    'DTEND;TZID=CampusNetZeit': [
      '20181217T110000',
      '20181217T130000',
      '20181217T160000',
      '20181217T170000',
      '20181220T110000',
      '20181220T140000'
    ],
    'LOCATION': [
      'D 2',
      'H 3',
      'C 1',
      'C 1',
      'D 2',
      'O 2'
    ],
    'SEQUENCE': [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0'
    ],
    'UID': [
      '368493985660313',
      '368494068816246',
      '368445898446386',
      '368445905593496',
      '368493904216126',
      '368494062075160'
    ],
    'DTSTAMP': [
      '20181219T204417Z',
      '20181219T204417Z',
      '20181219T204417Z',
      '20181219T204417Z',
      '20181219T204417Z',
      '20181219T204417Z'
    ],
    'SUMMARY': [
      'Verteilte Systeme',
      'Introduction to Text Mining (in English)',
      'IT-Sicherheit',
      'IT-Sicherheit',
      'Verteilte Systeme',
      'Introduction to Text Mining (in English)'
    ],
    'CATEGORIES': [
      '',
      '',
      '',
      '',
      '',
      ''
    ]
  };
  public tbl = {};
  constructor() {
  }

  ngOnInit() {
  }

}
