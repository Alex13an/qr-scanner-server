import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import knex from './db/knex.js';
import errorHandler from './middleware/ErrorHandler.js';
import GoogleSheetsRepository from './repositories/GoogleSheetsRepository.js';
import GoogleSheetsUpdater from './repositories/GoogleSheetsUpdaterRepository.js';
import https from 'https';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', router);

app.use(express.static(path.join(path.dirname(__dirname), 'qr-scanner-server/client/dist')))

app.use(errorHandler);

app.get('*', (req, res) => {
  res.sendFile(path.join(path.dirname(__dirname), 'qr-scanner-server/client/dist/index.html'))
})

const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
}

const httpServer = https.createServer(httpsOptions, app);

(async () => {
  try {
    await knex.migrate.latest();
    console.log('DB loaded successfully');
    await GoogleSheetsRepository.getUpdates();
    httpServer.listen(PORT, () => console.log(`server started on port ${PORT}`));
    GoogleSheetsUpdater.startTimer();
  } catch (err) {
    console.log(err);
  }
})();
