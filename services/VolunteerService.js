import knex from '../db/knex.js';

const tableName = 'volunteers';

const columns = {
  volunteer_id: 'volunteer_id',
  volunteer_row: 'volunteer_row',
  day_one: 'day_one',
  day_two: 'day_two',
  day_three: 'day_three',
}

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
    console.log(res);
    if (!res || !res.volunteer_id) {
      throw new Error('Not found');
    }
    return res;
  }
}

export default new VolunteerService();
