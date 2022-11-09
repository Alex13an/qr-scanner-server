import { google } from 'googleapis';
const service = google.sheets("v4");

const SHEET_ID = 'users';

class GoogleUserService {
  async getUser(qrData, authClient) {
    if (!qrData) {
      throw new Error('No proper data!')
    }
    const data = qrData.split('_');
    if (data.length < 3) {
      throw new Error('Wrong number of arguments')
    }
    let [id, row, sheet] = data;
    const rowIndex = row[0];
    if (rowIndex !== 'A') {
      throw new Error('Incorrect row')
    }
    row = row.slice(1);

    const users = await service.spreadsheets.values.batchGet({
      auth: authClient,
      spreadsheetId: process.env.SHEET_ID,
      ranges: [`${SHEET_ID}!A${row}:D${row}`, `${SHEET_ID}!L${row}:N${row}`],
    });

    return users.data;
  }
}

export default new GoogleUserService();
