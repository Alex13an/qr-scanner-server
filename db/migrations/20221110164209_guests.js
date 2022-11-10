export async function up(knex) {
  await knex.schema.createTable('guests', (table) => {
    table.integer('guest_id').notNullable();
    table.integer('guest_row').notNullable();
    table.integer('day_one').notNullable().defaultTo(0);
    table.integer('day_two').notNullable().defaultTo(0);
    table.integer('day_three').notNullable().defaultTo(0);
    table.integer('day_four').notNullable().defaultTo(0);
    table.string('session_b').notNullable().defaultTo(0);
    table.string('session_c').notNullable().defaultTo(0);
    table.string('session_d').notNullable().defaultTo(0);
    table.string('session_e').notNullable().defaultTo(0);
    table.string('session_f').notNullable().defaultTo(0);
    table.string('session_g').notNullable().defaultTo(0);
    table.string('session_h').notNullable().defaultTo(0);
  })
};

export async function down(knex) {
  await knex.schema.dropTable('guests');
};
