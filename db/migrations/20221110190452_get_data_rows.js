export async function up(knex) {
  await knex.schema.createTable('get_data_rows', (table) => {
    table.string('sheet').notNullable();
    table.integer('sheet_last_row').notNullable();
  })
};

export async function down(knex) {
  await knex.schema.dropTable('get_data_rows');
};
