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
  //todo: register new user-function
  //todo: track currently active users (needs http request on client logout/timeout)
  //todo: hash passwords
});

app.post('/users/register', function(req, res) {
  console.log('got a register-post: '+req.body.password+', '+req.body.username);
  db = new sqlite3.Database(dbPath, (err) => {if(err) {return console.error(err.message)}});
  var statement = db.prepare('SELECT id FROM users WHERE username = ?', [req.body.username]);
  statement.get(function(err, result) {
      if(err) {console.error(err.message);
    }
    if(!result) {
      console.log(result);
      //var statement2 = db.prepare('this is not a sqlite query (YET)', [req.body.username, req.body.password]);
      //statement.get(function(err, result) {/*DO SOMETHING.*/}):
      res.send(JSON.stringify('registered'));
    } else {
      res.send(JSON.stringify('failed'));
  }});
});

const port = 4000;
app.listen(port, function() {
  console.log('Example app listening on port '+port);
});
