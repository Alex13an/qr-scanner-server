import OtherService from '../services/OtherService.js';
import ApiError from '../utils/ApiError.js';
import GoogleSheetsUpdaterRepository from '../repositories/GoogleSheetsUpdaterRepository.js';

export function otherControllerCreator(sheet) {
  const tableName = sheet;
  return async function enterOther(req, res, next) {
    try {
      const id = req.params.id; // example: 674283283
      const day = req.body.day; // example 'day_one'
      if (!id) {
        next(ApiError.badRequest('Not enough data'));
        return;
      }
      const guest = await OtherService.getGuest(id, tableName);
      const currentCheck = guest[day];
      if (currentCheck) {
        res.status(200).json({ updated: false, reason: 'Already entered' })
        return;
      }
      const newCheck  = 1;
      const resData = await OtherService.updateGuest(id, day, newCheck, tableName);

      if (resData) {
        GoogleSheetsUpdaterRepository.addUpdate({
          data: newCheck,
          type: tableName,
          row: guest.guest_row,
          extra: { day: day, check: true },
        });

        const message = 'Entered in successfully';
        res.status(200).json({ updated: true, message });
      } else {
        next(ApiError.badRequest({ updated: false, mesage: 'Updating error' }));
      }
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
};
