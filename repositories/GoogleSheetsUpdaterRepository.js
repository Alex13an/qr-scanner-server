import GoogleAuthService from '../services/GoogleAuthService.js';
import GoogleUpdateService from '../services/GoogleUpdateService.js';
import { setIntervalAsync } from 'set-interval-async';
import { createUpdate } from '../utils/UpdateCreator.js'

const UPDATE_PERIOD = 1500;

class GoogleSheetsUpdater {
  updateFields = [];

  startTimer = () => {
    setIntervalAsync(this.timedCallback, UPDATE_PERIOD);
  }

  timedCallback = async () => {
    try {
      console.log('tick');

      if (this.updateFields.length < 1) {
        return;
      }

      const updateNum = await this.makeUpdate();
      this.updateFields.splice(0, updateNum);
    } catch (err) {
      console.log(err);
    }
  } 

  addUpdate = ({ data, type, row, extra }) => {
    const update = createUpdate(data, type, row, extra);
    this.updateFields.push(update);
  }

  makeUpdate = async () => {
    try {
      const fields = [...this.updateFields];
      const authClient = await GoogleAuthService.authorize();
      await GoogleUpdateService.makeUpdate(fields, authClient);

      return fields.length;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new GoogleSheetsUpdater();
