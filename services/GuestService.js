import knex from '../db/knex.js';
import { guestsColumns as columns } from '../models/dbTypes.js';
import tableTypes from '../models/tableTypes.js';

const tableName = tableTypes.guests;

class GuestService {
  async addGuests(guests) {
    await knex(tableName).insert(guests);
  }

  async getGuest(id) {
    const res = await knex.select(...Object.values(columns)).from(tableName).where({ guest_id: id }).first();
    if (!res || !res.guest_id) {
      throw new Error('Not found');
    }
    return res;
  }

  async updateGuest(id, day, check) {
    if (!columns[day]) {
      throw new Error('Wrong day data');
    }
    const res = await knex(tableName).where({ guest_id: id }).update(columns[day], check);
    return res;
  }

  async updateGuestEvent(id, session, eventData) {
    const res = await knex(tableName).where({ guest_id: id }).update(session, eventData);
    return res;
  }

  async updateGuestEvents(events) {
    if (!events || !events.length) {
      throw new Error('Wrong event data');
    }
    knex.transaction(trx => {
      const queries = [];
      events.forEach(event => {
        const { guest_id, form_row, ...eventData } = event;
        const query = knex(tableName)
        .where(columns.guest_id, event.guest_id)
        .update({
          ...eventData,
        })
        .transacting(trx); 
        queries.push(query);
      });

      Promise.all(queries)
        .then(trx.commit)
        .catch(trx.rollback);
    });
  }

  async getActiveSeats(session, eventId) {
    const res = await knex(tableName).select(`session_${session} as amount`)
      .where(`session_${session}`, `1,${eventId}`)
      .orWhere(`session_${session}`, `2,${eventId}`)
      .orWhere(`session_${session}`, `3,${eventId}`);
    return res;
  }
}

export default new GuestService();
