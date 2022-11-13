import ApiError from '../utils/ApiError.js';
import GoogleAuthService from '../services/GoogleAuthService.js';
import GoogleSheetsRepository from '../repositories/GoogleSheetsRepository.js';

class UpdateController {
  async updateVolunteers(req, res, next) {
    try {
      const authClient = await GoogleAuthService.authorize();
      await GoogleSheetsRepository.getVolunteers(authClient);
      res.status(200).json({ message: 'Successfully updated' });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async updateGuests(req, res, next) {
    try {
      const authClient = await GoogleAuthService.authorize();
      await GoogleSheetsRepository.getGuests(authClient);
      res.status(200).json({ message: 'Successfully updated' });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async updatePress(req, res, next) {
    try {
      const authClient = await GoogleAuthService.authorize();
      await GoogleSheetsRepository.getPress(authClient);
      res.status(200).json({ message: 'Successfully updated' });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async updateLocalPress(req, res, next) {
    try {
      const authClient = await GoogleAuthService.authorize();
      await GoogleSheetsRepository.getLocalPress(authClient);
      res.status(200).json({ message: 'Successfully updated' });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async updateStaff(req, res, next) {
    try {
      const authClient = await GoogleAuthService.authorize();
      await GoogleSheetsRepository.getStaff(authClient);
      res.status(200).json({ message: 'Successfully updated' });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async updateOther(req, res, next) {
    try {
      const authClient = await GoogleAuthService.authorize();
      await GoogleSheetsRepository.getOther(authClient);
      res.status(200).json({ message: 'Successfully updated' });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async updateOrganizators(req, res, next) {
    try {
      const authClient = await GoogleAuthService.authorize();
      await GoogleSheetsRepository.getOrganizators(authClient);
      res.status(200).json({ message: 'Successfully updated' });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

export default new UpdateController();
