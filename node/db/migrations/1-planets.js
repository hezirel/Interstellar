export function up(knex) {
    return knex.schema.createTable('planets', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable()
        table.string('code').notNullable().primary();
    });
}

export function down(knex) {
    return knex.schema.dropTable('planets');
}
