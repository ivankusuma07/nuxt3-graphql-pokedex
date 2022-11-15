import gql from 'graphql-tag'

export const GET_POKEMON_LIST = gql`
  query samplePokeAPIquery($limit: Int!) {
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

export default { GET_POKEMON_LIST }
