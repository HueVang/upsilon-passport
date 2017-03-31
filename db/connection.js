var pg = require('pg');
var pool = new pg.Pool({
  database: DATABASE_URL
});

module.exports = pool;
