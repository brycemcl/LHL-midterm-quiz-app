;(() => {
  let dbParams = {};

  if (process.env.DATABASE_URL) {
    dbParams.connectionString = process.env.DATABASE_URL;
  } else {
    dbParams = {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB
    };
  }

  // PG database client/connection setup
  const { Pool } = require('pg');
  const db = new Pool(dbParams);
  db.connect();

  module.exports = db;
})();
