<template>
  <div class="max-w-md mx-auto mb-10 p-3">
    <div class="search-bar">
      <div class="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input v-model="searchByName" class="search-input" type="text" id="search" placeholder="Search pokemon.." />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GET_POKEMON_LIST_BY_NAME, GET_POKEMON_LIST } from '~~/api/pokeList'

import _ from 'lodash'
const searchByName = ref('')

let data = ref([])
const emit = defineEmits(['data-searched'])
watch(
  () => searchByName.value,
  () => {
    console.log(searchByName.value)
    tests(searchByName.value)
  }
)

async function search(name: string) {
  // console.log('test')
  // name
  console.log('nama ', name)
  let variables = { name: `%${name}%` }
  const variables2 = { limit: 10 }
  if (name === '' || name === null) {
    ;({ data } = await useAsyncQuery(GET_POKEMON_LIST, variables2))
  } else {
    ;({ data } = await useAsyncQuery(GET_POKEMON_LIST_BY_NAME, variables))
  }

  console.log('data from graphql ', data)
  emit('data-searched', data.value)
}

const tests = _.debounce(async (value: any) => {
  search(value)
}, 600)
</script>

<style lang="postcss">
.search-bar {
  @apply relative flex items-center w-full h-12 rounded-lg border overflow-hidden;
  background: var(--bg-input);
  border-color: var(--border-color);
  box-shadow: 0 2px 8px var(--shadow);
}

.search-bar:focus-within {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2), 0 2px 8px var(--shadow);
}

.search-icon {
  @apply grid place-items-center h-full w-12;
  color: var(--text-muted);
}

.search-input {
  @apply h-full w-full outline-none text-sm pr-2;
  background: transparent;
  color: var(--text-primary);
}

.search-input::placeholder {
  color: var(--text-muted);
}
</style>
