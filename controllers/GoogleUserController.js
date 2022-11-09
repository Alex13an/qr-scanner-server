import GoogleUserService from '../services/GoogleUserService.js';
import GoogleAuthService from '../services/GoogleAuthService.js';

class GoogleUserController {
  async getUser(req, res) {
    try {
      const qrData = req.query.qrData;
      console.log(req.query);

      const authClient = await GoogleAuthService.authorize();
      const users = await GoogleUserService.getUser(qrData, authClient);
      console.log(users);
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorMessage: err });
    }
  }
}

export default new GoogleUserController();
