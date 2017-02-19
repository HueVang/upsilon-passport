var express = require('express');
var config = {database : 'passport'};
var pg = require('pg');
var multer = require('multer');
// var upload = multer({dest: '/Users/huevang/Upsilon/solo-project/upsilon-passport/public/uploads/'})
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/huevang/Upsilon/solo-project/upsilon-passport/public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, username + '.jpg')
  }
})

var upload = multer({ storage: storage })

var router = express.Router();
var pool = new pg.Pool(config);

var username = '';

router.post('/image', upload.any(), function(req, res, next) {
  console.log('This is username: ', typeof username);
  console.log('This is the req.file: ', req.files);
  res.redirect('back');
});

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

router.get('/userinfo', function(req, res){
  console.log('user id?::', req.user.id);
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {
     client.query(
       'SELECT * from users WHERE id=$1;',
       [req.user.id]
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


router.get('/image', function(req, res){
  console.log('user id?::', req.user.id);
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {
     client.query(
       'SELECT image from users WHERE id=$1;',
       [req.user.id]
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
      [req.user.id,req.body.firstname, req.body.lastname, req.body.image, req.body.personalsummary,
       req.body.cohort, req.body.title, req.body.user_location, req.body.facts],
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
});//end of post user



module.exports = router;
