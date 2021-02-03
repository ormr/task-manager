require('dotenv').config();
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
// import compression from 'compression';
import { connectDatabase } from './database';

import { boardRouter } from './routes/api'

const app: express.Application = express();

connectDatabase();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/board', boardRouter);

// Production
// app.use(compression());
// app.use(express.static(`${__dirname}/client`));
// app.get('/*', (_req, res) => res.sendFile(`${__dirname}/client/index.html`));

app.listen(process.env.PORT, () => {
  console.log(`[app]: Server started on http://localhost:${process.env.PORT}`);
});