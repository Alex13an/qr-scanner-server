import knex from 'knex';

export default knex({
  client: 'mysql',
  connection: {
    host : process.env.DATABASE_HOST,
    port : process.env.DATABASE_PORT,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME,
  },
  migrations: {
    directory: './db/migrations',
  },
  pool: { min: 0, max: 10 }
});
