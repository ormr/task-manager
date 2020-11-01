require('dotenv').config();
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import { connectDatabase } from './database';

import { boardRouter, cardRouter, listRouter } from './routes/api'

const app: Application = express();

connectDatabase();

app.use(bodyParser.json());

app.use('/boards', boardRouter);
app.use('/cards', cardRouter);
app.use('/lists', listRouter);

app.listen(process.env.PORT, () => {
  console.log(`[app]: Server started on http://localhost:${process.env.PORT}`)
});