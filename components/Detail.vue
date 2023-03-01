<template>
  <div>
    <!-- <div v-for="mons in data.pokemon" :key="mons.id"> -->
    <!-- <Card :datas="data.pokemon" /> -->
    <!-- </div> -->
    <!-- {{ data.po }}

    <div v-for="mons in data.pokemon"> -->
    <div>
      {{ poke.id }}
      {{ poke.name }}
      {{ poke.specy.genus[8].genus }}

      <div v-for="type in poke.type">
        {{ type.pokemon_v2_type.name }}
      </div>
      <div style="color: red;"><a href="https://privy.id/terms-of-use-privypass" target="_blank">Privacy and policy</a></div>
      <!-- {{ poke.type.pokemon_v2_type.name }} -->
    </div>
    <div>
    
    </div>
    <iframe src="https://pokedex-nuxt3-graphql.netlify.app/" style="border:1px solid black;" width="1200" height="600" scrolling="yes"  ></iframe>
    

    <!-- {{ data.pokemon.specy.genus[8].genus }} -->
    <!-- {{ data.pokemon.type.pokemon_v2_type.name }} -->
  </div>
</template>

<script lang="ts" setup>
import { GET_DETAIL_POKEMON } from '~~/api/pokeList'
const props = defineProps({
  ids: {
    type: Number,
    default: 0
  }
})

const variables = { id: props.ids }
const { data } = await useAsyncQuery(GET_DETAIL_POKEMON, variables)

console.log(data.value.pokemon[0])
const poke = computed(() => {
  return data.value.pokemon[0]
})
const genus = computed(() => {
  return data.value.pokemon[0].specy.genus[8].genus
})
</script>

<style lang="postcss">
/* .card {
    @apply block p-3 w-80 h-52 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 my-10 mx-auto relative flex flex-row justify-center;
  
    &-poke-text {
      @apply text-center text-white;
    }
  }
  
  .poke-img {
    @apply absolute -top-20;
  }
  
  .card-title {
    @apply absolute bottom-5;
    @apply block p-1 w-60 h-10 bg-gray-500 rounded-md border shadow-lg;
  } */
</style>
