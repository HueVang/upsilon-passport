var express = require('express');
var config = {database : 'passport'};
var pg = require('pg');

var router = express.Router();
var pool = new pg.Pool(config);

router.get('/cohorts',function(req,res){
  console.log('user id?::',req.user.id);
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
});//end of get

router.post('/post',function(req,res){
  console.log('req.body::',req.body);
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {

     client.query(
       'UPDATE users SET firstname=$2, lastname=$3, image=$4, personalsummary=$5, cohort=$6, title=$7, user_location=$8, facts=$9 WHERE id=$1 RETURNING *;',
      [req.user.id,req.body.firstName, req.body.lastName, req.body.image, req.body.personalSummary,
       req.body.cohort, req.body.title, req.body.location_name, req.body.facts],
      function(err,result){
        done();
        if(err){
          console.log('error querying db',err);
          res.sendStatus(500);
        } else {
          console.log('post posted info from db',result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});//end of post

module.exports = router;
