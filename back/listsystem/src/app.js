import express from 'express';
import pg from 'pg';
import cors from 'cors';
import systensRouter from './routes/systens.js';

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
app.use('/systens', systensRouter);

app.listen(3002, async () => {
  console.log('API started!');
});
