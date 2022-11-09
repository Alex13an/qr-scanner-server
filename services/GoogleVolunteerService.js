import { google } from 'googleapis';
const service = google.sheets("v4");

const SHEET_ID = 'volunteers';
const INITIAL_ROW = 2;

class GoogleVolunteerService {
  async getVolunteerList(authClient) {
    const volunteers = await service.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId: process.env.SHEET_ID,
      range: `${SHEET_ID}!C${INITIAL_ROW}:C`,
    });

    return { result: volunteers.data.values, initialRow: INITIAL_ROW };
  }
}

export default new GoogleVolunteerService();
