<template>
  <div>
    <div class="flex flex-row flex-wrap justify-center gap-10">
      <!-- <div v-for="mons in data.pokemon" :key="mons.id"> -->
      <Card :datas="data.pokemon" />
      <!-- </div> -->
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
    if (props.datas) {
      data.value = props.datas
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
