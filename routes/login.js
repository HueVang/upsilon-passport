const router = require('express').Router();
var passport = require('passport');

var express = require('express');
var config = {database : 'dljn2v22d1htu'};
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
