<template>
  <div class="container mx-auto">
    <Header />
    <Search @data-searched="searchData" />
    <ListCard :datas="dataSearched" />
  </div>
</template>

<script lang="ts" setup>
const dataSearched = ref([])

function searchData(data) {
  console.log('data from search', data)
  dataSearched.value = data
}
</script>
