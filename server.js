var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var passport = require('passport');
// var config = {database : DATABASE_URL};
var config = {
  // user: 'foo', //env var: PGUSER
  database: 'dljn2v22d1htu', //env var: PGDATABASE
  // password: 'secret', //env var: PGPASSWORD
  host: 'ec2-54-235-92-236.compute-1.amazonaws.com', // Server hosting the postgres database
  port: 5432 //env var: PGPORT
  // max: 10, // max number of clients in the pool
  // idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var multer = require('multer');
var upload = multer({dest: 'uploads/'})

var connection = require('./db/connection');
var login = require('./routes/login');
var register = require('./routes/register');
var profile = require('./routes/profile');
var cohorts = require('./routes/cohorts');
var home = require('./routes/home');

require('./auth/setup');

connection.connect();

var app = express();

var sessionConfig = {
  secret: process.env.SECRET || 'super secret key goes here',
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000, // 30 minutes
    secure: false
  }
}

app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

// no auth needed
app.use('/login', login);
app.use('/register', register);
app.get('/loginStatus', function(req, res){
  res.send(req.isAuthenticated());
})
app.use('/profile', profile);
app.use('/cohorts', cohorts);
app.use('/home', home);

// the following routes require authentication
app.use('/private', ensureAuthenticated);

app.get('/private/secretInfo', function(req, res){
  console.log('Sending secret info');
  res.send('This is very secret!');
});

function ensureAuthenticated(req, res, next) {
  console.log('Ensuring the user is authenticated');
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
}

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});



var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port', server.address().port);
});
