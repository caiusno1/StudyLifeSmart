let app = require('express')();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json({extended:true}));
var path = require('path')
var dbPath = path.resolve(__dirname, 'database.db')
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbPath, (err) => {if(err) {return console.error(err.message)} console.log('Connected!');});
//db.run('CREATE TABLE users(id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)');
db.close();
let http = require('http').Server(app);


app.post('/users/authenticate', function (req, res) {
  console.log('got a post: '+req.body.password+', '+req.body.username);
  //todo: database connection
  db = new sqlite3.Database(dbPath, (err) => {if(err) {return console.error(err.message)}});
  var statement = db.prepare('SELECT id FROM users WHERE username = ? AND password = ?', [req.body.username, req.body.password]);
  statement.get(function(err, result) {
      if(err) {console.error(err.message);
    }
    if(result) {
      console.log(result);
      res.send(JSON.stringify('authenticated'));
    } else {
      res.send(JSON.stringify('failed'));
  }});
});

app.get('/', function(req, res) {
  console.log('get request');
  res.send('Hello World!');
});


const port = 4000;
app.listen(port, function() {
  console.log('Example app listening on port '+port);
});
