<template>
  <div class="max-w-md mx-auto mb-10">
    <div class="relative flex items-center w-full h-12 rounded-lg border focus-within:shadow-lg bg-white overflow-hidden">
      <div class="grid place-items-center h-full w-12 text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input v-model="searchByName" class="peer h-full w-full outline-none text-sm text-gray-700 pr-2" type="text" id="search" placeholder="Search pokemon.." />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GET_POKEMON_LIST_BY_NAME, GET_POKEMON_LIST } from '~~/api/pokeList'
// import lodash from '~~/plugin/lodash'
import _ from 'lodash'
const searchByName = ref('')
// const nameFormatted = computed(() => {
//   return `%${searchByName.value}%`
// })
// const variables = { name: nameFormatted.value }

let data = ref([])
const emit = defineEmits(['data-searched'])
watch(
  () => searchByName.value,
  () => {
    console.log(searchByName.value)
    tests(searchByName.value)
    // let datas

    // // datas =
    // datas = _.debounce(() => test(searchByName.value), 1000)
    // datas()
    // console.log('hehe', datas())
    // emit('data-searched', datas)
  }
)

// debounce(() => {
//   test()
// }, 1000)

// function debounce(func, timeout = 1000) {
//   let timer
//   return (...args) => {
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       func.apply(this, args)
//     }, timeout)
//   }
// }

async function test(name: string) {
  // console.log('test')
  // name
  console.log('nama ', name)
  let variables = { name: `%${name}%` }
  const variables2 = { limit: 10 }
  if (name === null) {
    ;({ data } = await useAsyncQuery(GET_POKEMON_LIST, variables2))
  } else {
    ;({ data } = await useAsyncQuery(GET_POKEMON_LIST_BY_NAME, variables))
  }
  // variables = { name: `%${name}%` }
  // if(name !== '')

  console.log('data from graphql ', data)
  emit('data-searched', data.value)
}

const tests = _.debounce(async (value) => {
  test(value)
}, 600)

// console.log('search ', data.value)

// console.log(data)
</script>
