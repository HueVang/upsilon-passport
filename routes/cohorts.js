var express = require('express');
var config = {database : 'passport'};
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
