const router = require('express').Router();
var passport = require('passport');

var express = require('express');
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
var pg = require('pg');
var pool = new pg.Pool(config);

router.post('/', passport.authenticate('local'), function(req, res){
  res.sendStatus(200);
});

router.delete('/', function(req, res){
  req.logout();
  res.sendStatus(204);
});

router.get('/users', function(req, res){
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {
     client.query(
       'SELECT * from users;',
      function(err,result){
        done();
        if(err){
          console.log('error querying db',err);
          res.sendStatus(500);
        } else {
          console.log('get posted info from db',result.rows);
          res.send(result.rows);
        }
      });
    }
  });
}); // end of get userinfo

module.exports = router;
