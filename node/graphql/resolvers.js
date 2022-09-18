import config from '../db/knexfile.js';
import Knex from 'knex';

const db = new Knex(config);

const resolvers = {
    Query: {
        planets() {
            return db.select().from('planets');
        },
        ports() {
            return db.select().from('ports').limit(10).then((rows) => rows);
        }
    }
};

export default resolvers;
