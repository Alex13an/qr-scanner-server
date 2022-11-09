import VolunteerService from '../services/VolunteerService.js';
import ApiError from '../utils/ApiError.js';

class VolunteerController {
  async getVolunteer(req, res, next) {
    try {
      const id = req.params.id;
      const data = await VolunteerService.getVolunteer(id);

      res.status(200).json(data);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

export default new VolunteerController();
