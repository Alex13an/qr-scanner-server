import GuestService from '../services/GuestService.js';
import ApiError from '../utils/ApiError.js';
import GoogleSheetsUpdaterRepository from '../repositories/GoogleSheetsUpdaterRepository.js';
import tableTypes from '../models/tableTypes.js';

class GuestController {
  async enterGuest(req, res, next) {
    try {
      const id = req.params.id;
      const day = 'day_one'; // TODO day cycle
      if (!id) {
        next(ApiError.badRequest('Not enough data'));
        return;
      }
      const guest = await GuestService.getGuest(id);
      const currentCheck = guest[day];
      if (currentCheck) {
        res.status(200).json({ updated: false, reason: 'Already entered' })
        return;
      }
      const newCheck  = 1;
      const resData = await GuestService.updateGuest(id, day, newCheck);

      if (resData) {
        GoogleSheetsUpdaterRepository.addUpdate({
          data: newCheck,
          type: tableTypes.guests,
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

  async guestEnterEvent(req, res, next) {
    try {
      const id = req.params.id;
      const session = req.body.session;
      const eventId = req.body.eventId;

      if (!id || !session || !eventId) {
        next(ApiError.badRequest('Not enough data'));
        return;
      }

      const guest = await GuestService.getGuest(id);
      const currentSession = guest[session];
      if (!currentSession || currentSession === '0') {
        res.status(200).json({ updated: false, reason: 'Guest is not registered to this event' })
        return;
      }
      const [checkId, eventReg] = currentSession.split(',');
      if (!checkId || !eventReg) {
        res.status(200).json({ updated: false, reason: 'Guest data error' })
      }
      if (eventReg !== eventId) {
        res.status(200).json({ updated: false, reason: `Guest registered to another event ( ${session}, ${eventReg} )` });
      }
      if (checkId >= 2) {
        res.status(200).json({ updated: false, reason: 'Guest already entered this event. If he want to leave, choose another scanner option' })
      }
      const newCheck = `2,${eventReg}`;
      const resData = await GuestService.updateGuestEvent(id, session, newCheck);

      if (resData) {
        const { guest_row, day_one, day_two, day_three, day_four, ...data } = guest;
        data[session] = newCheck;
        GoogleSheetsUpdaterRepository.addUpdate({
          data,
          type: tableTypes.Events,
          row: guest.guest_row,
          extra: { eventsOnly: true },
        });

        const message = 'Checked in successfully';
        res.status(200).json({ updated: true, message });
      } else {
        next(ApiError.badRequest({ updated: false, mesage: 'Updating error' }));
      }
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

export default new GuestController();
