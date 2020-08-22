import express from 'express';
import pg from 'pg';
import cors from 'cors';
import loginsRouter from './routes/logins.js';

const app = express();
app.use(cors());

const Pool = pg.Pool;

global.pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'archoffice',
  password: 'Postgres',
  port: 5432,
});

app.use(express.json());
app.use('/logins', loginsRouter);

app.listen(3001, async () => {
  console.log('API started!');
});
