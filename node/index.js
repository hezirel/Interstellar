import { ApolloServer, gql } from 'apollo-server-koa';

import Koa from 'koa';
import logger from 'koa-logger';

const port = process.env.PORT;
const app = new Koa();
const typeDefs = gql`

type Port {
    uid: String
    name: String
    description: String
    latitude: Float
    longitude: Float
    planet_code: String
}

type Planet {
    name: String
    code: String
}

type Query {
    ports: [Port]
    planets: [Planet]
}
`;

const resolvers = {
    Query: {
        ports: () => 1,
        planets: () => 2,
    }
};


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
});

await server.start();
app.use(logger());
server.applyMiddleware({ app });
app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});
