import knex from '../db/knex.js';
import { otherColumns as columns } from '../models/dbTypes.js';

class OtherService {
  async addGuests(guests, tableName) {
    await knex(tableName).insert(guests);
  }

  async getGuest(id, tableName) {
    const res = await knex.select(...Object.values(columns)).from(tableName).where({ guest_id: id }).first();
    if (!res || !res.guest_id) {
      throw new Error('Not found');
    }
    return res;
  }

  async updateGuest(id, day, check, tableName) {
    if (!columns[day]) {
      throw new Error('Wrong day data');
    }
    const res = await knex(tableName).where({ guest_id: id }).update(columns[day], check);
    return res;
  }
}

export default new OtherService();
