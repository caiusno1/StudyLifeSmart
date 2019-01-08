let app = require('express')();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
let http = require('http').Server(app);
var ical2json = require("ical2json");
let user2timetbl={}
var WEEKDAYS = {
    MONTAG: 1,
    DIENSTAG: 2,
    MITTWOCH: 3,
    DONNERSTAG: 4,
    FREITAG: 5,
    SAMSTAG: 6,
    SONNTAG: 0,
  };
function parse2Date(vobjectDate){
    year=vobjectDate.substr(0,4);
    month=vobjectDate.substr(4,2);
    day=vobjectDate.substr(6,2);
    hour=vobjectDate.substr(9,2);
    minute=vobjectDate.substr(11,2);
    second=vobjectDate.substr(13,2);
    // console.log(year+"/"+month+"/"+day+" "+hour+":"+minute);
    return new Date(year+'-'+month+'-'+day+'T'+hour+':'+minute+':'+second);
}
function number2WeekDay(number){
    if(number==0){
        return "Sonntag";
    }
    else if(number==1){
        return "Montag";
    }
    else if(number==2){
        return "Dienstag";
    }
    else if(number==3){
        return "Mittwoch";
    }
    else if(number==4){
        return "Donnerstag";
    }
    else if(number==5){
        return "Freitag";
    }
    else if(number==6){
        return "Samstag";
    }
    else{
        return undefined;
    }
}
function formathours(hour){
    if((hour+0)<10){
        return "0"+hour;
    }else{
        return hour
    }
}
app.post('/registerTimeTable/:username', function (req, res) {
    icalTbl = ical2json.convert(req.body.ics);
    var i=0;
    while(i<icalTbl.VCALENDAR[0].VEVENT.length){
        var starttime= icalTbl.VCALENDAR[0].VEVENT[i]['DTSTART;TZID=CampusNetZeit'];
        var endtime= icalTbl.VCALENDAR[0].VEVENT[i]['DTEND;TZID=CampusNetZeit'];
        if(!user2timetbl[req.params.username]){
            user2timetbl[req.params.username]={};
        }
        var starttimeDate=parse2Date(starttime);
        var endtimeDate=parse2Date(endtime);
        if(!user2timetbl[req.params.username][number2WeekDay(starttimeDate.getDay())]){
            user2timetbl[req.params.username][number2WeekDay(starttimeDate.getDay())]=[];
        }
        user2timetbl[req.params.username][number2WeekDay(starttimeDate.getDay())].push({"title":""+icalTbl.VCALENDAR[0].VEVENT[i]['SUMMARY'],"starttime":""+formathours(starttimeDate.getHours()), "length":""+endtimeDate.getHours()-starttimeDate.getHours()});
        i++
    }
    console.log(user2timetbl[req.params.username]);
    //todo parse for day and hours
    res.send('Successfully saved TimeTable for user: ' + req.params.username);
});
app.get('/getTimeTable/:username',function (req, res) {
    res.send(user2timetbl[req.params.username]);
});

app.listen(7000, function () {
    console.log('Example app listening on port 7000!');
});
  
