var express = require('express');
var config = {database : 'passport'};
var pg = require('pg');

var router = express.Router();
var pool = new pg.Pool(config);

router.get('/cohorts',function(req,res){
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

// router.post('/post',function(req,res){
//   console.log('req.body::',req.body);
//   pool.connect(function(err,client,done){
//     if(err){
//       console.log('error connecting to DB',err);
//       res.sendStatus(500);
//       done();
//     } else {
//
//      client.query(
//       'INSERT INTO gif_favs (gif_url, gif_comment) values($1, $2) returning *;',
//       [req.body.gifUrl, req.body.gifComment],
//       function(err,result){
//         done();
//         if(err){
//           console.log('error querying db',err);
//           res.sendStatus(500);
//         } else {
//           console.log('post posted info from db',result.rows);
//           res.send(result.rows);
//         }
//       });
//     }
//   });
// });//end of post

module.exports = router;
