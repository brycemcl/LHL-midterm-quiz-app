const dbParams = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'quiz_entities'
});

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

module.exports = dbParams;
