import planets from '../data/planets.json' assert { type: 'json' };

export function seed(knex){
  return knex('planets').del().then(() => {
        return knex('planets').insert(planets);
    });
}
