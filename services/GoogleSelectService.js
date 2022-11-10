import { google } from 'googleapis';
const service = google.sheets("v4");

class GoogleSelectService {
  async getSheetList(authClient, sheetId, startRow, startColumn, endColumn) {
    const users = await service.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId: process.env.SHEET_ID,
      range: `${sheetId}!${startColumn}${startRow}:${endColumn}`,
    });

    return { result: users.data.values, initialRow: startRow };
  }
}

export default new GoogleSelectService();
