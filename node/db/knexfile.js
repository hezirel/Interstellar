export default {
    client: 'pg',
    connection: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@mimir:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
    migrations: {
        directory: './migrations/'
    },
    seeds: {
        directory: './seeds/'
    }
};
