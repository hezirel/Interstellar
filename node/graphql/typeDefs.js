import { gql } from 'apollo-server-koa';

const typeDefs = gql`
type SpaceCenter {
    id: ID!
    uid: String
    name: String
    description: String
    latitude: Float
    longitude: Float
    planet_code: Planet
}

type Planet {
    id: ID!
    name: String
    code: String
}

type Query {
    spacecenters: [SpaceCenter]
    planets: [Planet]
}
`;

export default typeDefs;
