var express = require('express');
// var config = {database : DATABASE_URL};
var config = {
  user: 'idwqxqspnhwibt', //env var: PGUSER
  database: 'dljn2v22d1htu', //env var: PGDATABASE
  password: '1e1434b18a9ee44d5a4bdc3ef1d9981cf78c65efcf70f4cf5f23c07e5876036d', //env var: PGPASSWORD
  host: 'ec2-54-235-92-236.compute-1.amazonaws.com', // Server hosting the postgres database
  port: 5432 //env var: PGPORT
  // max: 10, // max number of clients in the pool
  // idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
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
  console.log(req.body);
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
       'UPDATE users SET firstname=$2, lastname=$3, personalsummary=$4, cohort=$5, title=$6, user_location=$7, facts=$8, github=$9, linkedin=$10 WHERE id=$1 RETURNING *;',
      [req.user.id,req.body.firstname, req.body.lastname, req.body.personalsummary,
       req.body.cohort, req.body.title, req.body.user_location, req.body.facts, req.body.github, req.body.linkedin],
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
