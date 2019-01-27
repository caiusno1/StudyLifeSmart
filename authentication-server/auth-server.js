let app = require('express')();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json({extended:true}));
let http = require('http').Server(app);

app.post('/users/authenticate', function (req, res) {
  console.log('got a post: '+req.body.password+', '+req.body.username);
  //todo: database connection
  if(req.body.username=='admin' && req.body.password=='password') {
    res.send(JSON.stringify('authenticated'));
  } else {
    res.send(JSON.stringify('failed'));
  }
});

app.get('/', function(req, res) {
  console.log('get request');
  res.send('Hello World!');
});


const port = 4000;
app.listen(port, function() {
  console.log('Example app listening on port '+port);
});
