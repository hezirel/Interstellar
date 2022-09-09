const Koa = require('koa');
const app = new Koa();
const route = require('koa-route');
const port = process.env.PORT || 3000;

app.use(route.get('/', (ctx) => {
    ctx.body = 'Hello world';
}));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
