import config from '../db/knexfile.js';
import Knex from 'knex';

const db = new Knex(config);

const resolvers = {
    Query: {
        planets() {
            return db.select().from('planets');
        },
        spacecenters() {
            return db.select().from('spacecenters').limit(10).then((rows) => rows);
        }
    }
};

export default resolvers;
