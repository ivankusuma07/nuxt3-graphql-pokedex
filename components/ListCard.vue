<template>
  <div>
    <div class="flex flex-row flex-wrap justify-around">
      <div v-for="mons in data.pokemon">
        <Card :datas="mons" />
        <!-- <div class="poke-img">
          <img :src="`${JSON.parse(mons.image[0].sprites).other['home'].front_default}`" width="200" height="200" alt="" />
        </div>

        <div class="card-title">
          <div class="card-poke-text">{{ `#${num}` }} {{ mons.name.charAt(0).toUpperCase() + mons.name.slice(1) }}</div>
        </div> -->
      </div>
      <!-- {{ mons.pokemon_v2_pokemonsprites[0].sprites }} -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GET_POKEMON_LIST } from '~~/api/pokeList'

const props = defineProps({
  datas: {
    type: Object,
    default: {}
  }
})

const variables = { limit: 10 }
const { data } = await useAsyncQuery(GET_POKEMON_LIST, variables)

watch(
  () => props.datas,
  () => {
    // console.log('data pokemon searched')
    if (props.datas) {
      // console.log('searched ', props.datas)
      data.value = props.datas
      // data = props.datas
    }
  }
)
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
