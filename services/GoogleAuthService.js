import { google } from 'googleapis';

class GoogleAuthService {
  async authorize() {
    try {
      const authClient = new google.auth.JWT(
        process.env.CLIENT_EMAIL,
        null,
        process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
        ["https://www.googleapis.com/auth/spreadsheets"]
      );
      const token = await authClient.authorize();
      authClient.setCredentials(token);
      return authClient;
    } catch (err) {
      throw new Error('Authorization error', err);
    }
  }
}

export default new GoogleAuthService();
