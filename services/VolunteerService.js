import knex from '../db/knex.js';
import { volunteerColumns as columns } from '../models/dbTypes.js';
import tableTypes from '../models/tableTypes.js';

const tableName = tableTypes.volunteers;

class VolunteerService {
  async addVolunteers(volunteers) {
    await knex(tableName).insert(volunteers);
  }

  async getVolunteers() {
    const res = await knex.select(columns.volunteer_id).from(tableName);
    return res;
  }

  async getVolunteer(id) {
    const res = await knex.select(...Object.values(columns)).from(tableName).where({ volunteer_id: id }).first();
    if (!res || !res.volunteer_id) {
      throw new Error('Not found');
    }
    return res;
  }

  async updateVolunteer(id, day, check) {
    if (!columns[day]) {
      throw new Error('Wrong day data');
    }
    const res = await knex(tableName).where({ volunteer_id: id }).update(columns[day], check);
    return res;
  }
}

export default new VolunteerService();
