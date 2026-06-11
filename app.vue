<template>
  <div>
    <nav class="navbar">
      <div class="navbar-inner">
        <div class="navbar-center">
          <NuxtLink to="/" class="navbar-brand">Pokédex</NuxtLink>
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
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
const { isDark, toggle, init } = useTheme()
onMounted(() => init())
</script>

<style>
:root {
  --bg-primary: #f0f2f5;
  --bg-secondary: #ffffff;
  --bg-card: #ffffff;
  --bg-evo-circle: #e8eaed;
  --bg-stat-bar: #e5e7eb;
  --bg-input: #ffffff;
  --text-primary: #1a1a2e;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --border-color: #e5e7eb;
  --shadow: rgba(0, 0, 0, 0.08);
  --card-title-base: rgb(55 65 81);
}

.dark {
  --bg-primary: #1a1a2e;
  --bg-secondary: #16213e;
  --bg-card: #16213e;
  --bg-evo-circle: #1a1a2e;
  --bg-stat-bar: #2a2a4a;
  --bg-input: #1a1a2e;
  --text-primary: #ffffff;
  --text-secondary: #a0a0b0;
  --text-muted: #6b7280;
  --border-color: #2a2a4a;
  --shadow: rgba(0, 0, 0, 0.3);
  --card-title-base: rgb(55 65 81);
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background 0.3s, color 0.3s;
  margin: 0;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
  backdrop-filter: blur(8px);
}

.navbar-inner {
  max-width: 56rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 16px;
}

.navbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.navbar-brand {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--text-secondary);
}

.navbar-brand:hover {
  opacity: 0.8;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.theme-btn {
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
  cursor: pointer;
  border: none;
  color: var(--text-secondary);
  background: transparent;
  line-height: 0;
}

.theme-btn:hover {
  background: var(--bg-evo-circle);
}
</style>
