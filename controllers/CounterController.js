import EventsLimitsService from '../services/EventsLimitsService.js';
import ApiError from '../utils/ApiError.js';
import eventTypes from '../models/eventTypes.js';
import GuestService from '../services/GuestService.js';

const sessions = ['b', 'c', 'd', 'e', 'f', 'g', 'h'];

class CounterController {
  async initLimits(req, res, next) {
    try {
      await EventsLimitsService.initEventsLimits();
      res.status(200).json({ message: 'Limits inited' });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getCounter(req, res, next) {
    try {
      const eventData = req.params.id; // example: b4
      const [session, eventId] = eventData.split('');

      const resData = await EventsLimitsService.getEventLimit(session, eventId);
      if (!resData) {
        next(ApiError.badRequest('There is no specified limit for this event'));
        return;
      }
      const { limit, free_space } = resData;
      const data = await GuestService.getActiveSeats(session, eventId);
      if (!data) {
        next(ApiError.badRequest('Places not found'));
      }
      const registeredSeats = data.reduce((sum, place) => {
        if (place.amount[0] === '1') {
          sum += 1;
        }
        return sum;
      }, 0)

      const enteredSeats = data.reduce((sum, place) => {
        if (place.amount[0] === '2') {
          sum += 1;
        }
        return sum;
      }, 0)
      const placeData = { regPlaces: limit - registeredSeats - enteredSeats, seatPlaces: limit - enteredSeats + free_space };
      res.status(200).json({ placeData });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
  async getCounter(req, res, next) {
    try {
      const eventData = req.params.id; // example: b4
      const [session, eventId] = eventData.split('');

      const resData = await EventsLimitsService.getEventLimit(session, eventId);
      if (!resData) {
        next(ApiError.badRequest('There is no specified limit for this event'));
        return;
      }
      const { limit, free_space } = resData;
      const data = await GuestService.getActiveSeats(session, eventId);
      if (!data) {
        next(ApiError.badRequest('Places not found'));
      }
      const registeredSeats = data.reduce((sum, place) => {
        if (place.amount[0] === '1') {
          sum += 1;
        }
        return sum;
      }, 0)

      const enteredSeats = data.reduce((sum, place) => {
        if (place.amount[0] === '2') {
          sum += 1;
        }
        return sum;
      }, 0)
      const placeData = { regPlaces: limit - registeredSeats - enteredSeats, seatPlaces: limit - enteredSeats + free_space };
      res.status(200).json({ placeData });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async addEventLimit(req, res, next) {
    try {
      const session = req.params.session; // example: b
      const eventId = '' + req.body.eventId; // example: 4
      const limit = req.body.limit; // example: 150
      if (!session || !eventId || !limit) {
        next(ApiError.badRequest('Not enough data'));
        return;
      }
      if (!sessions.some(s => s === session)) {
        next(ApiError.badRequest('Incorrect session id'));
        return;
      }
      if (eventId > eventTypes[`session_${session}`] || eventId < 0) {
        next(ApiError.badRequest('This session does not contain this event id'));
        return;
      }
      const resData = await EventsLimitsService.addEventLimit(session, eventId, limit);
      if (resData) {
        const message = 'Event limit added successfully';
        res.status(200).json({ message });
      } else {
        next(ApiError.badRequest('Updating error'));
      }
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async updateFreeSpace(req, res, next) {
    try {
      const session = req.params.session; // example: b
      const eventId = '' + req.body.eventId; // example: 4
      const freeSpace = req.body.freeSpace; // example: 1
      const increment = req.body.increment; // example: true
      if (!session || !eventId || !freeSpace || increment === undefined) {
        next(ApiError.badRequest('Not enough data'));
        return;
      }
      if (!sessions.some(s => s === session)) {
        next(ApiError.badRequest('Incorrect session id'));
        return;
      }
      if (eventId > eventTypes[`session_${session}`] || eventId < 0) {
        next(ApiError.badRequest('This session does not contain this event id'));
        return;
      }
      const resData = await EventsLimitsService.updateFreeSpace(session, eventId, freeSpace, increment);
      if (resData) {
        const message = 'Free Space ' + increment ? 'incremented' : 'decremented';
        res.status(200).json({ message });
      } else {
        next(ApiError.badRequest('Updating error'));
      }
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getCounterForce(req, res, next) {
    try {
      const eventData = req.params.id; // example: b4
      const [session, eventId] = eventData.split('');

      const resData = await EventsLimitsService.getEventLimit(session, eventId);
      if (!resData) {
        next(ApiError.badRequest('There is no specified limit for this event'));
        return;
      }
      const { limit, free_space } = resData;
      const seatsData = await GuestService.getActiveSeatsForce(session, eventId);
      if (!seatsData) {
        next(ApiError.badRequest('Places not found'));
      }
      const placeData = { regPlaces: 0, seatPlaces: limit - seatsData[0].amount + free_space };
      res.status(200).json({ placeData });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

export default new CounterController();
