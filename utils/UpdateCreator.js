import tableTypes from '../models/tableTypes.js';
import { volunteerColumns } from '../models/dbTypes.js';

export const createUpdate = (data, type, row, extra) => {
  if (!tableTypes[type]) {
    console.error('WRONG TYPE');
    return;
  }
  
  if (type === tableTypes.volunteers) {
    if (!extra.day) {
      console.error('NOT ENOUGH DAY DATA');
      return;
    }
    let cell = '';
    switch (extra.day) { // hardcode from google sheets VERY FUCKING IMPORTANT
      case volunteerColumns.day_one:
        cell += 'I';
        break;
      case volunteerColumns.day_two:
        cell += 'J';
        break;
      case volunteerColumns.day_three:
        cell += 'K';
        break;
      case volunteerColumns.day_four:
        cell += 'L';
        break;
      default: 
        console.error('WRONG DAY ARGUMENT');
        return;
    }
    cell += row;
    return { range: `${type}!${cell}`, values: [[`${data}`]] };
  }

  if (type === tableTypes.guests && extra.check) {
    if (!extra.day) {
      console.error('NOT ENOUGH DAY DATA');
      return;
    }
    let cell = '';
    switch (extra.day) { // hardcode from google sheets VERY FUCKING IMPORTANT
      case volunteerColumns.day_one:
        cell += 'P';
        break;
      case volunteerColumns.day_two:
        cell += 'Q';
        break;
      case volunteerColumns.day_three:
        cell += 'R';
        break;
      case volunteerColumns.day_four:
        cell += 'S';
        break;
      default: 
        console.error('WRONG DAY ARGUMENT');
        return;
    }
    cell += row;
    return { range: `${type}!${cell}`, values: [[`${data}`]] };
  }

  if (type === tableTypes.Events && extra.eventsOnly) {
    const range = `${type}!A${row}:H${row}`;
    const values = Object.values(data);
    return { range, values: [values] };
  }
}
