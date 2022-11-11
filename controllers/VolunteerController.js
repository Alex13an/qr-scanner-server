import VolunteerService from '../services/VolunteerService.js';
import ApiError from '../utils/ApiError.js';
import GoogleSheetsUpdaterRepository from '../repositories/GoogleSheetsUpdaterRepository.js';
import tableTypes from '../models/tableTypes.js';

class VolunteerController {
  async checkVolunteer(req, res, next) {
    try {
      const id = req.params.id;
      const day = '' + req.body.day; // example day_one
      const checkIn = req.body.checkIn; // example false
      if (!id || !day || checkIn === undefined) {
        next(ApiError.badRequest('Not enough data'));
        return;
      }
      const volunteer = await VolunteerService.getVolunteer(id);
      const currentCheck = volunteer[day];
      let newCheck;
      if (checkIn) {
        if (currentCheck === 1) {
          res.status(200).json({ updated: false, reason: 'Already checked in' })
          return;
        }
        if (currentCheck === 2) {
          res.status(200).json({ updated: false, reason: 'Already checked out' })
          return;
        }
        newCheck = 1;
      } else {
        if (!currentCheck) {
          res.status(200).json({ updated: false, reason: 'Not checked in yet' })
          return;
        }
        if (currentCheck === 2) {
          res.status(200).json({ updated: false, reason: 'Already checked out' })
          return;
        }
        newCheck = 2;
      }
      const data = await VolunteerService.updateVolunteer(id, day, newCheck);

      if (data) {
        GoogleSheetsUpdaterRepository.addUpdate({
          data: newCheck,
          type: tableTypes.volunteers,
          row: volunteer.volunteer_row,
          extra: { day: day },
        });

        const message = newCheck > 1 ? 'Checked out successfully' : 'Checked in successfully';
        res.status(200).json({ updated: true, message });
      } else {
        next(ApiError.badRequest({ updated: false, mesage: 'Updating error' }));
      }
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

export default new VolunteerController();
