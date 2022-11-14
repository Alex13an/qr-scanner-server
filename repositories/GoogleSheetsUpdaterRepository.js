import GoogleAuthService from '../services/GoogleAuthService.js';
import GoogleUpdateService from '../services/GoogleUpdateService.js';
import GoogleSheetsRepository from './GoogleSheetsRepository.js';
import { setIntervalAsync } from 'set-interval-async';
import { createUpdate } from '../utils/UpdateCreator.js'

const UPDATE_PERIOD = 2000;

class GoogleSheetsUpdater {
  updateFields = [];
  tick = 0;

  startTimer = () => {
    setIntervalAsync(this.timedCallback, UPDATE_PERIOD);
  }

  timedCallback = async () => {
    try {
      // const authClient = await GoogleAuthService.authorize();

      if (this.updateFields.length < 1) {
        return;
      }

      await GoogleSheetsRepository.getForm(authClient);
      const updateNum = await this.makeUpdate(authClient);
      this.updateFields.splice(0, updateNum);
    } catch (err) {
      console.log(err);
    }
  } 

  addUpdate = ({ data, type, row, extra }) => {
    const update = createUpdate(data, type, row, extra);
    this.updateFields.push(update);
  }

  makeUpdate = async (authClient) => {
    try {
      const fields = [...this.updateFields];
      await GoogleUpdateService.makeUpdate(fields, authClient);

      return fields.length;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new GoogleSheetsUpdater();
