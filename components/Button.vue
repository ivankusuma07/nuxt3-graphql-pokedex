<template>
  <NuxtLink v-if="to" :to="to" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else :class="classes" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineEmits<{ click: [e: MouseEvent] }>()

const props = withDefaults(defineProps<{
  to?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
}>(), {
  variant: 'primary',
  size: 'md'
})

const classes = computed(() => [
  'btn',
  `btn-${props.variant}`,
  `btn-${props.size}`
])
</script>

<style lang="postcss">
.btn {
  @apply inline-flex items-center justify-center font-semibold no-underline rounded-lg transition-all cursor-pointer;
  @apply border;
}

.btn-primary {
  background: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

.btn-primary:hover {
  opacity: 0.85;
}

.btn-secondary {
  background: var(--bg-evo-circle);
  border-color: var(--border-color);
  color: var(--text-secondary);
}

.btn-secondary:hover {
  opacity: 0.85;
}

.btn-ghost {
  background: transparent;
  border-color: transparent;
  color: var(--text-secondary);
}

.btn-ghost:hover {
  background: var(--bg-evo-circle);
}

.btn-sm {
  @apply px-3 py-1.5 text-sm gap-1.5;
}

.btn-md {
  @apply px-4 py-2 text-sm gap-2;
}
</style>
