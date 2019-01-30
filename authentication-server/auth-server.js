let app = require('express')();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json({extended:true}));
var path = require('path');
var dbPath = path.resolve(__dirname, 'database.db');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbPath, (err) => {if(err) {return console.error(err.message)} console.log('Connected!');});
db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)');
db.close();
// const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;
let http = require('http').Server(app);


app.post('/users/authenticate', function (req, res) {
  console.log('got a post: '+req.body.password+', '+req.body.username);
  db = new sqlite3.Database(dbPath, (err) => {if(err) {return console.error(err.message)}});
  var statement = db.prepare('SELECT id, password, salt FROM users WHERE username = ?', [req.body.username]);
  statement.get(function(err, result) {
    if(err) {console.error(err.message);}
    if(result) {
      console.log(result);
      const hash = crypto.createHmac('sha256', result.salt)
                   .update(req.body.password)
                   .digest('hex');
      if(hash===result.password){
        res.send(JSON.stringify('authenticated'));
      }
      else{
        res.send(JSON.stringify('failed'));
      }
      /*bcrypt.compare(req.body.password, result.password, function(err, res2) {
        if(err) {console.error(err.message);}
        if(res2) {
          res.send(JSON.stringify('authenticated'));
        } else {
          res.send(JSON.stringify('failed'));
        }
      });
      */
    } else {
      res.send(JSON.stringify('failed'));
  }});
  //todo: track currently active users (needs http request on client logout/timeout)
});

app.post('/users/register', function(req, res) {
  console.log('got a register-post: '+req.body.password+', '+req.body.username);
  db = new sqlite3.Database(dbPath, (err) => {if(err) {return console.error(err.message)}});
  var statement = db.prepare('SELECT id FROM users WHERE username = ?', [req.body.username]);
  statement.get(function(err, result) {
    if(err) {console.error(err.message);
    }
    if(!result) {
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = crypto.createHmac('sha256', salt)
                   .update(req.body.password)
                   .digest('hex');
      var statement2 = db.prepare('INSERT INTO users(username, password,salt) VALUES (?, ?, ?);', [req.body.username, hash, salt]);
      statement2.get(function(err, result) {
        if(err) {console.error(err.message);}
        console.log('New user data has been added to the DB.');
        res.send(JSON.stringify('registered'));
      });
      /*
      bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) {console.error(err.message);}
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          if(err) {console.error(err.message);}
            var statement2 = db.prepare('INSERT INTO users(username, password) VALUES (?, ?);', [req.body.username, hash]);
            statement2.get(function(err, result) {
              if(err) {console.error(err.message);}
              console.log('New user data has been added to the DB.');
              res.send(JSON.stringify('registered'));
          });
        });
        
      });*/
    } else {
      res.send(JSON.stringify('failed'));
  }});
});

const port = 4000;
app.listen(port, function() {
  console.log('Example app listening on port '+port);
});
