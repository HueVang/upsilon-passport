var pg = require('pg');
var pool = new pg.Pool({
  user: 'idwqxqspnhwibt', //env var: PGUSER
  database: 'dljn2v22d1htu', //env var: PGDATABASE
  password: '1e1434b18a9ee44d5a4bdc3ef1d9981cf78c65efcf70f4cf5f23c07e5876036d', //env var: PGPASSWORD
  host: 'ec2-54-235-92-236.compute-1.amazonaws.com', // Server hosting the postgres database
  port: 5432 //env var: PGPORT
});

module.exports = pool;
