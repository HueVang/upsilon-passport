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

var router = express.Router();
var pool = new pg.Pool(config);


router.get('/cohorts',function(req,res){
  console.log('user id?::',req.user.id);
  username = req.user.username;
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {
     client.query(
       'SELECT * from cohorts;'
      ,
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
});//end of get cohorts

router.get('/:id',function(req,res){
  console.log('user id?::',req.user.id);
  username = req.user.username;
  console.log('Params?1', req.params);
  console.log('Params?2', req.params.id);
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {
     client.query(
       'SELECT * from users WHERE cohort=$1;',
       [req.params.id]
      ,
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
});//end of get cohorts



router.get('/users', function(req, res){
  console.log('username?::', req.user.username);
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {
     client.query(
       'SELECT * from users;'
      ,
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
