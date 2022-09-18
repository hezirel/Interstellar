export function up(knex) {
    return knex.schema.createTable('ports', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.uuid('uid').notNullable().primary();
        table.text('description').notNullable();
        table.float('latitude').notNullable();
        table.float('longitude').notNullable();
        table.string('planet_code').notNullable().references('code').inTable('planets');
    });
}

export function down(knex) {
    return knex.schema.dropTable('ports');
}
