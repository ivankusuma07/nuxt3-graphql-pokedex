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
      type: pokemon_v2_pokemontypes {
        id
        pokemon_v2_type {
          name
        }
      }
      specy: pokemon_v2_pokemonspecy {
        id
        evo: pokemon_v2_evolutionchain {
          id
          species: pokemon_v2_pokemonspecies {
            name
            mons: pokemon_v2_pokemons {
              sprite: pokemon_v2_pokemonsprites {
                sprites
              }
            }
          }
        }
        genus: pokemon_v2_pokemonspeciesnames {
          genus
        }
      }
    }
  }
`

export default { GET_POKEMON_LIST, GET_POKEMON_LIST_BY_NAME, GET_DETAIL_POKEMON }
