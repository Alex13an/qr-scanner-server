import knex from '../db/knex.js';
import { eventsLimitsColumns as columns, eventsLimitsColumns } from '../models/dbTypes.js';
import tableTypes from '../models/tableTypes.js';

const tableName = tableTypes.events_limits;

class EventsLimitsService {
  async addEventLimit(session, event_id, limit) {
    const currentEventLimit = await knex.select().from(tableName).where({ session, event_id }).first();
    let res;
    if (currentEventLimit) {
      res = await knex(tableName).where({ session, event_id }).update({ limit });
    } else {
      res = await knex(tableName).insert({
        session,
        event_id,
        limit,
      });
    }
    return res;
  }

  async getEventLimit(session, event_id) {
    const res = await knex.select(eventsLimitsColumns.limit, eventsLimitsColumns.free_space).from(tableName).where({ session, event_id }).first()
    return res;
  }

  async updateFreeSpace(session, event_id, free_space, increment) {
    let res;
    if (increment) {
      res = await knex(tableName).where({ session, event_id }).increment({ free_space });
    } else {
      res = await knex(tableName).where({ session, event_id }).decrement({ free_space });
    }
    return res;
  }
}

export default new EventsLimitsService();
