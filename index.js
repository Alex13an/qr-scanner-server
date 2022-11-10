import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import knex from './db/knex.js';
import errorHandler from './middleware/ErrorHandler.js';
import GoogleSheetsRepository from './repositories/GoogleSheetsRepository.js';
import GoogleSheetsUpdater from './repositories/GoogleSheetsUpdaterRepository.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', router);
app.use(errorHandler);

(async () => {
  try {
    await knex.migrate.latest();
    console.log('DB loaded successfully');
    await GoogleSheetsRepository.getUpdates();
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    GoogleSheetsUpdater.startTimer();
  } catch (err) {
    console.log(err);
  }
})();
