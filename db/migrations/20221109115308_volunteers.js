export async function up(knex) {
  await knex.schema.createTable('volunteers', (table) => {
    table.integer('volunteer_id').notNullable();
    table.integer('volunteer_row').notNullable();
    table.integer('day_one').notNullable().defaultTo(0);
    table.integer('day_two').notNullable().defaultTo(0);
    table.integer('day_three').notNullable().defaultTo(0);
  })
};

export async function down(knex) {
  await knex.schema.dropTable('volunteers');
};
