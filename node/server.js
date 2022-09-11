import Koa from 'koa';
import logger from 'koa-logger';
import { ApolloServer } from 'apollo-server-koa';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { typeDefs, resolvers } from './graphql/index.js';

const port = process.env.PORT;
const app = new Koa();

//const knex = require('knex')({
    //client: 'pg',
    //connection: "postgres://postgres:gnosis@mimir:5432/interstellar",
    //searchPath: ['knex', 'public']
//});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
});

app.use(logger());
await server.start();

server.applyMiddleware({ app });

app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});
