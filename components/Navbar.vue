<template>
  <nav class="navbar" v-if="mounted">
    <div class="navbar-inner">
      <div class="navbar-center">
        <span class="navbar-title">Pokédex</span>
      </div>
      <div class="navbar-right">
        <button class="theme-btn" @click="toggle" :title="isDark ? 'Light mode' : 'Dark mode'">
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const { isDark, toggle } = useTheme()
const mounted = ref(false)
onMounted(() => { mounted.value = true })
</script>

<style lang="postcss">
.navbar {
  @apply sticky top-0 z-50 border-b;
  background: var(--bg-secondary);
  border-color: var(--border-color);
  backdrop-filter: blur(8px);
}

.navbar-inner {
  @apply max-w-4xl mx-auto flex items-center justify-between h-12 px-4;
}

.navbar-center {
  @apply flex-1 flex justify-center;
}

.navbar-title {
  @apply text-sm font-bold tracking-wider uppercase;
  color: var(--text-secondary);
}

.navbar-right {
  @apply flex items-center;
}

.theme-btn {
  @apply p-2 rounded-lg transition-colors cursor-pointer border-none;
  color: var(--text-secondary);
  background: transparent;
  line-height: 0;
}

.theme-btn:hover {
  background: var(--bg-evo-circle);
}
</style>
