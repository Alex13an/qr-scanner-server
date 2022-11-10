import knex from '../db/knex.js';
import { getDataRowColumns as columns } from '../models/dbTypes.js';
import tableTypes from '../models/tableTypes.js';

const tableName = tableTypes.get_data_rows;

class GetDataRowService {
  async getLastRow(sheet) {
    const res = await knex.select(...Object.values(columns)).from(tableName).where({ sheet }).first();
    if (!res || !res.sheet) {
      return null;
    }
    return res.sheet_last_row;
  }

  async addLastRow(sheet, lastRow) {
    await knex(tableName).insert({ sheet, sheet_last_row: lastRow });
  }

  async updateLastRow(sheet, lastRow) {
    const res = await knex(tableName).where({ sheet }).update(columns.sheet_last_row, lastRow);
    return res;
  }
}

export default new GetDataRowService();
