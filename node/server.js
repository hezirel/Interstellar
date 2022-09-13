import Koa from 'koa';
import logger from 'koa-logger';
import { ApolloServer } from 'apollo-server-koa';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { typeDefs, resolvers } from './graphql/index.js';
import Knex from 'knex';

const pg_url = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@mimir:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
const apollo_port = process.env.APOLLO_PORT || 4000;
const app = new Koa();

const knex = new Knex({
    client: 'pg',
    connection: pg_url,
    searchPath: ['knex', 'public']
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
});

app.use(logger());

knex.raw("SELECT 1").then(() => {
    console.log("Postgres connection successful");

    server.start().then(async () => {
        server.applyMiddleware({ app });
        app.listen( apollo_port , () => {
            console.log(`🚀 Server ready at http://localhost:${apollo_port}${server.graphqlPath}`);
        });
    });
}).catch((err) => {
    console.error("Postgres connection failed");
    console.error(err);
});




