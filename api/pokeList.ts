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

export default { GET_POKEMON_LIST, GET_POKEMON_LIST_BY_NAME }
