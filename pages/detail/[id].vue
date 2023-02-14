<template>
  <div>
    <Detail :ids="Number(route.params.id)" />
  </div>
</template>

<script lang="ts" setup>
 onBeforeRouteLeave ((to, from, next) => {
  console.log("from",from)
    if (window?.event?.type === 'popstate' && from.name === 'detail-id')
      next(false)
    else
      next()
  },)
const route = useRoute()
</script>
