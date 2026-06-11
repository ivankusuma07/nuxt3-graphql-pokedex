import gql from 'graphql-tag'

export const GET_POKEMON_LIST = gql`
  query pokeAPIquery($limit: Int!) {
    pokemon: pokemon_v2_pokemon(limit: $limit) {
      id
      name
      order
      type: pokemon_v2_pokemontypes {
        type_id
        id
        pokemon_v2_type {
          name
        }
      }
      image: pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`

export const GET_POKEMON_LIST_BY_NAME = gql`
  query pokeAPIquerySearch($name: String!) {
    pokemon: pokemon_v2_pokemon(where: { name: { _ilike: $name } }) {
      id
      name
      order
      type: pokemon_v2_pokemontypes {
        type_id
        id
        pokemon_v2_type {
          name
        }
      }
      image: pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`

export const GET_DETAIL_POKEMON = gql`
  query pokeAPIqueryDetail($id: Int!) {
    pokemon: pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      name
      id
      height
      weight
      base_experience
      type: pokemon_v2_pokemontypes {
        id
        pokemon_v2_type {
          name
          efficacy: pokemonV2TypeefficaciesByTargetTypeId {
            damage_factor
            attacking_type: pokemon_v2_type {
              name
            }
          }
        }
      }
      image: pokemon_v2_pokemonsprites {
        sprites
      }
      stats: pokemon_v2_pokemonstats {
        base_stat
        effort
        stat: pokemon_v2_stat {
          name
        }
      }
      abilities: pokemon_v2_pokemonabilities(order_by: { slot: asc }) {
        is_hidden
        slot
        ability: pokemon_v2_ability {
          name
        }
      }
      moves: pokemon_v2_pokemonmoves(
        distinct_on: move_id
        limit: 20
        order_by: [{ move_id: asc }, { level: asc }]
      ) {
        level
        move: pokemon_v2_move {
          name
          accuracy
          power
          pp
          type: pokemon_v2_type {
            name
          }
        }
      }
      forms: pokemon_v2_pokemonforms(where: { is_default: { _eq: false } }) {
        form_name
        is_mega
        pokemon_v2_pokemonformnames(where: { language_id: { _eq: 9 } }) {
          name
        }
      }
      specy: pokemon_v2_pokemonspecy {
        id
        base_happiness
        capture_rate
        gender_rate
        hatch_counter
        is_baby
        is_legendary
        is_mythical
        has_gender_differences
        evolves_from_species_id
        evo: pokemon_v2_evolutionchain {
          id
          pokemon_v2_pokemonspecies {
            name
            mons: pokemon_v2_pokemons {
              sprite: pokemon_v2_pokemonsprites {
                sprites
              }
            }
          }
        }
        egg_groups: pokemon_v2_pokemonegggroups {
          egg_group: pokemon_v2_egggroup {
            name
          }
        }
        flavor_texts: pokemon_v2_pokemonspeciesflavortexts(
          where: { language_id: { _eq: 9 } }
          limit: 1
        ) {
          flavor_text
        }
        genus: pokemon_v2_pokemonspeciesnames {
          genus
          language_id
        }
      }
    }
  }
`

export default { GET_POKEMON_LIST, GET_POKEMON_LIST_BY_NAME, GET_DETAIL_POKEMON }
