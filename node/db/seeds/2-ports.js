import ports from '../data/ports.json' assert { type: 'json' };

export function seed(knex){
  return knex('spacecenters').del().then(() => {
        return knex('spacecenters').insert(ports);
    });
}
