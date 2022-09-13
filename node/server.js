import Koa from 'koa';
import logger from 'koa-logger';
import { ApolloServer } from 'apollo-server-koa';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { typeDefs, resolvers } from './graphql/index.js';
import Knex from 'knex';

const apollo_port = process.env.APOLLO_PORT || 4000;
const app = new Koa();

const knex = new Knex({
    client: 'pg',
    connection: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@mimir:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
    searchPath: ['knex', 'public']
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
});

process.env.NODE_ENV === "development" && app.use(logger());

app.use(async (ctx, next) => {
    ctx.set('X-Clacks-Overhead', 'GNU Terry Pratchet');
    await next();
});

knex.raw("SELECT * FROM pg_catalog.pg_tables \
        WHERE schemaname != 'pg_catalog' \
        AND schemaname != 'information_schema';")
    .then((res) => {
        console.log("Postgres connection successful");
        console.log(res.rows);

        server.start().then(() => {
            server.applyMiddleware({ app });
            app.listen( apollo_port , () => {
                console.log(`🚀 Server ready at http://localhost:${apollo_port}${server.graphqlPath}`);
            });
        });

    }).catch((err) => {
        console.log("Postgres connection failed");
        console.error(err);
    });
