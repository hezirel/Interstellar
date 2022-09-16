import Koa from 'koa';
import logger from 'koa-logger';
import { ApolloServer } from 'apollo-server-koa';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { typeDefs, resolvers } from './graphql/index.js';
import config from './db/knexfile.js';
import Knex from 'knex';

const apollo_port = process.env.APOLLO_PORT || 4000;
const app = new Koa();
const testsql = new Knex(config);

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

testsql.raw("SELECT * FROM planets").then((res) => {
            console.log("Postgres connection successful");
            console.log(res.rows);

            server.start().then(() => {
                server.applyMiddleware({ app });
                app.listen( apollo_port , () => {
                    console.log(`🚀 Server ready at http://localhost:${apollo_port}${server.graphqlPath}`);
                });
            }).catch((err) => {
                console.log("Error starting Apollo server");
                console.error(err);
            });

        }).catch((err) => {
            console.log("Postgres connection failed");
            console.error(err);
});
