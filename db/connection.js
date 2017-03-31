var pg = require('pg');
var pool = new pg.Pool({
  database: 'dljn2v22d1htu', //env var: PGDATABASE
  // password: 'secret', //env var: PGPASSWORD
  host: 'ec2-54-235-92-236.compute-1.amazonaws.com', // Server hosting the postgres database
  port: 5432 //env var: PGPORT
});

module.exports = pool;
