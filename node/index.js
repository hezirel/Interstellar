const Koa = require('koa');
const app = new Koa();
const route = require('koa-route');
const logger = require('koa-logger');
const port = process.env.PORT;
const knex = require('knex')({
    client: 'pg',
    connection: "postgres://postgres:gnosis@mimir:5432/interstellar",
    searchPath: ['knex', 'public']
});

app.use(logger());
app.use(route.get('/', async (ctx) => {
    ctx.body = await knex.raw(`
    SELECT * FROM information_schema.tables;
    `).then((res) => {
        console.log(res.rows);
        return JSON.stringify(res.rows);
    });
}));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
