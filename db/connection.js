var pg = require('pg');

var pool = new pg.Pool({
  database: 'dljn2v22d1htu'
});

module.exports = pool;
