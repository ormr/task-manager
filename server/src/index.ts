require('dotenv').config();
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { connectDatabase } from './database';

import { boardRouter, cardRouter, listRouter } from './routes/api'

const app: express.Application = express();

connectDatabase();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/board', boardRouter);

app.listen(process.env.PORT, () => {
  console.log(`[app]: Server started on http://localhost:${process.env.PORT}`);
});