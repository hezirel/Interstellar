import { gql } from 'apollo-server-koa';

const typeDefs = gql`
type Port {
    uid: String
    name: String
    description: String
    latitude: Float
    longitude: Float
    planet_code: Planet
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

export default typeDefs;
