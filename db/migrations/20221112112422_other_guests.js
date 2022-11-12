export async function up(knex) {
  await knex.schema.createTable('other', (table) => {
    table.integer('guest_id').notNullable();
    table.integer('guest_row').notNullable();
    table.integer('day_one').notNullable().defaultTo(0);
    table.integer('day_two').notNullable().defaultTo(0);
    table.integer('day_three').notNullable().defaultTo(0);
    table.integer('day_four').notNullable().defaultTo(0);
  });

  await knex.schema.createTable('press', (table) => {
    table.integer('guest_id').notNullable();
    table.integer('guest_row').notNullable();
    table.integer('day_one').notNullable().defaultTo(0);
    table.integer('day_two').notNullable().defaultTo(0);
    table.integer('day_three').notNullable().defaultTo(0);
    table.integer('day_four').notNullable().defaultTo(0);
  })

  await knex.schema.createTable('local_press', (table) => {
    table.integer('guest_id').notNullable();
    table.integer('guest_row').notNullable();
    table.integer('day_one').notNullable().defaultTo(0);
    table.integer('day_two').notNullable().defaultTo(0);
    table.integer('day_three').notNullable().defaultTo(0);
    table.integer('day_four').notNullable().defaultTo(0);
  })

  await knex.schema.createTable('staff', (table) => {
    table.integer('guest_id').notNullable();
    table.integer('guest_row').notNullable();
    table.integer('day_one').notNullable().defaultTo(0);
    table.integer('day_two').notNullable().defaultTo(0);
    table.integer('day_three').notNullable().defaultTo(0);
    table.integer('day_four').notNullable().defaultTo(0);
  })

  await knex.schema.createTable('organizators', (table) => {
    table.integer('guest_id').notNullable();
    table.integer('guest_row').notNullable();
    table.integer('day_one').notNullable().defaultTo(0);
    table.integer('day_two').notNullable().defaultTo(0);
    table.integer('day_three').notNullable().defaultTo(0);
    table.integer('day_four').notNullable().defaultTo(0);
  })
};

export async function down(knex) {
  await knex.schema.dropTable('other');
  await knex.schema.dropTable('press');
  await knex.schema.dropTable('local_press');
  await knex.schema.dropTable('staff');
  await knex.schema.dropTable('organizators');
};
