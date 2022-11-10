import knex from '../db/knex.js';
import { volunteerColumns as columns } from '../models/dbTypes.js';
import tableTypes from '../models/tableTypes.js';

const tableName = tableTypes.guests;

class GuestService {
  async addGuests(guests) {
    await knex(tableName).insert(guests);
  }
}

export default new GuestService();
