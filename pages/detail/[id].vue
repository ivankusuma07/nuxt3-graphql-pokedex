<template>
  <div>
    <Detail :ids="Number(route.params.id)" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
</script>
