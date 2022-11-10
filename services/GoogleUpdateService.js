import { google } from 'googleapis';
const service = google.sheets("v4");

class GoogleUpdateService {
  async makeUpdate(updateFields, authClient) {
    if (!updateFields.length) {
      return;
    }

    const request = {
      auth: authClient,
      spreadsheetId: process.env.SHEET_ID,
      resource: {
        valueInputOption: 'RAW',
        data: updateFields,
      }
    }

    const response = await service.spreadsheets.values.batchUpdate(request);

    return response.data;
  }
}

export default new GoogleUpdateService();
