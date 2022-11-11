export async function up(knex) {
  await knex.schema.createTable('events_limits', (table) => {
    table.string('session').notNullable();
    table.integer('event_id').notNullable();
    table.integer('limit').notNullable();
    table.integer('free_space').notNullable().defaultTo(0);
  })
};

export async function down(knex) {
  await knex.schema.dropTable('events_limits');
};
