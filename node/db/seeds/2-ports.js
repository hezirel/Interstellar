import ports from '../data/ports.json' assert { type: 'json' };

export function seed(knex){
  return knex('ports').del().then(() => {
        return knex('ports').insert(ports);
    });
}
