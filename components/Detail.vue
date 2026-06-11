<template>
  <div class="detail-page" v-if="poke">
    <div class="detail-container">
      <nuxt-link to="/" class="back-btn">&larr; Back</nuxt-link>

      <div :class="`detail-header ${primaryType}-bg`">
        <div class="detail-sprite">
          <img :src="sprite" @error="onError" width="300" height="300" alt="" />
        </div>
      </div>

      <div class="detail-body">
        <div class="detail-id">{{ num(poke.id) }}</div>
        <h1 class="detail-name">{{ capitalizedName }}</h1>
        <div class="detail-genus">{{ genus }}</div>
        <div class="detail-types">
          <span
            v-for="t in poke.type"
            :key="t.id"
            :class="`type-badge type-${t.pokemon_v2_type.name}`"
          >
            {{ t.pokemon_v2_type.name }}
          </span>
        </div>
        <div class="detail-measurements">
          <div class="measure-item">
            <span class="measure-label">Height</span>
            <span class="measure-value">{{ height }}</span>
          </div>
          <div class="measure-item">
            <span class="measure-label">Weight</span>
            <span class="measure-value">{{ weight }}</span>
          </div>
        </div>
      </div>

      <section class="detail-section" v-if="poke.stats?.length">
        <h2 class="section-title">Stats</h2>
        <div class="stats-grid">
          <div v-for="s in poke.stats" :key="s.stat.name" class="stat-row">
            <span class="stat-label">{{ statLabel(s.stat.name) }}</span>
            <span class="stat-value">{{ s.base_stat }}</span>
            <div class="stat-bar-bg">
              <div
                class="stat-bar-fill"
                :style="{ width: statPercent(s.base_stat) }"
              ></div>
            </div>
          </div>
        </div>
        <div class="stat-total">
          Total: <strong>{{ statTotal }}</strong>
        </div>
      </section>

      <section class="detail-section" v-if="poke.abilities?.length">
        <h2 class="section-title">Abilities</h2>
        <div class="abilities-list">
          <div v-for="a in poke.abilities" :key="a.ability.name" class="ability-item">
            <span class="ability-name">
              {{ capitalize(a.ability.name) }}
            </span>
            <span v-if="a.is_hidden" class="ability-hidden">(Hidden)</span>
          </div>
        </div>
      </section>

      <section class="detail-section" v-if="evolutionChain.length > 1">
        <h2 class="section-title">Evolution Chain</h2>
        <div class="evo-chain">
          <div v-for="(evo, i) in evolutionChain" :key="evo.id" class="evo-item">
            <nuxt-link :to="`/detail/${evo.id}`" class="evo-link">
              <div class="evo-img-wrapper">
                <img :src="evo.sprite" @error="onEvoError" width="96" height="96" alt="" />
              </div>
              <div class="evo-name">{{ evo.name }}</div>
            </nuxt-link>
            <div v-if="i < evolutionChain.length - 1" class="evo-arrow">&rarr;</div>
          </div>
        </div>
      </section>

      <section class="detail-section" v-if="typeEffectiveness.length">
        <h2 class="section-title">Type Effectiveness</h2>
        <div class="effectiveness-grid">
          <div
            v-for="entry in typeEffectiveness"
            :key="entry.type"
            class="eff-item"
            :class="`eff-${entry.class}`"
          >
            <div class="eff-type">{{ entry.type }}</div>
            <div class="eff-value">&times;{{ entry.multiplier }}</div>
          </div>
        </div>
      </section>

      <section class="detail-section" v-if="poke.moves?.length">
        <h2 class="section-title">Moves</h2>
        <div class="moves-table-wrapper">
          <table class="moves-table">
            <thead>
              <tr>
                <th>Lv</th>
                <th>Move</th>
                <th>Type</th>
                <th>Pow</th>
                <th>Acc</th>
                <th>PP</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in poke.moves" :key="m.move.name + m.level">
                <td>{{ m.level }}</td>
                <td>{{ capitalize(m.move.name) }}</td>
                <td>
                  <span :class="`move-type type-${m.move.type.name}`">
                    {{ m.move.type.name }}
                  </span>
                </td>
                <td>{{ m.move.power || '&mdash;' }}</td>
                <td>{{ m.move.accuracy || '&mdash;' }}</td>
                <td>{{ m.move.pp }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="detail-section" v-if="flavorText">
        <h2 class="section-title">Pokédex Entry</h2>
        <p class="flavor-text">{{ flavorText }}</p>
      </section>

      <section class="detail-section">
        <h2 class="section-title">Breeding</h2>
        <div class="breeding-grid">
          <div class="breeding-item">
            <span class="breeding-label">Egg Groups</span>
            <span class="breeding-value">
              <template v-if="eggGroups?.length">
                {{ eggGroups.join(', ') }}
              </template>
              <span v-else class="text-gray-500">None</span>
            </span>
          </div>
          <div class="breeding-item">
            <span class="breeding-label">Gender Ratio</span>
            <span class="breeding-value">{{ genderRatio }}</span>
          </div>
          <div class="breeding-item">
            <span class="breeding-label">Egg Cycles</span>
            <span class="breeding-value">{{ hatchCounter }} cycles</span>
          </div>
          <div class="breeding-item">
            <span class="breeding-label">Capture Rate</span>
            <span class="breeding-value">{{ captureRate }}</span>
          </div>
          <div class="breeding-item">
            <span class="breeding-label">Base Happiness</span>
            <span class="breeding-value">{{ baseHappiness }}</span>
          </div>
          <div class="breeding-item">
            <span class="breeding-label">Base EXP</span>
            <span class="breeding-value">{{ baseExp }}</span>
          </div>
        </div>
      </section>

      <section class="detail-section" v-if="forms.length">
        <h2 class="section-title">Forms</h2>
        <div class="forms-grid">
          <div v-for="f in forms" :key="f.form_name || f.name" class="form-item">
            <img
              :src="formSprite(f)"
              @error="onEvoError"
              width="96"
              height="96"
              alt=""
            />
            <div class="form-name">{{ f.displayName }}</div>
            <div v-if="f.is_mega" class="form-badge">Mega</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GET_DETAIL_POKEMON } from '~~/api/pokeList'
import img from '@/assets/img/pokedex_logo.png'

const props = defineProps({
  ids: {
    type: Number,
    default: 0
  }
})

const variables = { id: props.ids }
const { data } = await useAsyncQuery(GET_DETAIL_POKEMON, variables)

const poke = computed(() => data.value?.pokemon?.[0] || null)

const sprite = computed(() => {
  if (!poke.value) return img
  const sprites = poke.value.image?.[0]?.sprites
  return sprites?.other?.['official-artwork']?.front_default || img
})

const capitalizedName = computed(() => {
  if (!poke.value) return ''
  return poke.value.name.charAt(0).toUpperCase() + poke.value.name.slice(1)
})

const genus = computed(() => {
  if (!poke.value?.specy?.genus) return ''
  const entry = poke.value.specy.genus.find((g: any) => g.language_id === 9)
  return entry?.genus || ''
})

const primaryType = computed(() => {
  return poke.value?.type?.[0]?.pokemon_v2_type?.name || 'normal'
})

const height = computed(() => {
  if (!poke.value?.height) return ''
  const h = poke.value.height / 10
  return h >= 1 ? `${h.toFixed(1)} m` : `${Math.round(h * 100)} cm`
})

const weight = computed(() => {
  if (!poke.value?.weight) return ''
  return `${(poke.value.weight / 10).toFixed(1)} kg`
})

const baseExp = computed(() => {
  return poke.value?.base_experience ?? 'Unknown'
})

const statTotal = computed(() => {
  if (!poke.value?.stats) return 0
  return poke.value.stats.reduce((sum: number, s: any) => sum + s.base_stat, 0)
})

const statPercent = (val: number) => {
  return `${Math.min((val / 255) * 100, 100)}%`
}

const statLabel = (name: string) => {
  const labels: Record<string, string> = {
    hp: 'HP',
    attack: 'Atk',
    defense: 'Def',
    'special-attack': 'SpA',
    'special-defense': 'SpD',
    speed: 'Spe'
  }
  return labels[name] || name
}

const evolutionChain = computed(() => {
  if (!poke.value?.specy?.evo?.pokemon_v2_pokemonspecies) return []
  return poke.value.specy.evo.pokemon_v2_pokemonspecies.map((s: any) => {
    const mon = s.mons?.[0]
    const sprites = mon?.sprite?.[0]?.sprites
    const spriteUrl = sprites?.other?.['official-artwork']?.front_default || img
    return {
      id: mon?.id || 0,
      name: s.name.charAt(0).toUpperCase() + s.name.slice(1),
      sprite: spriteUrl
    }
  }).filter((e: any) => e.id)
})

const typeEffectiveness = computed(() => {
  if (!poke.value?.type) return []
  const allTypes = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ]
  const combined: Record<string, number> = {}
  for (const t of allTypes) combined[t] = 1
  for (const t of poke.value.type) {
    const effs = t.pokemon_v2_type.efficacy || []
    for (const e of effs) {
      const atkName = e.attacking_type?.name
      if (atkName && combined[atkName] != null) {
        combined[atkName] *= e.damage_factor / 100
      }
    }
  }
  return allTypes
    .map((type) => ({
      type,
      multiplier: combined[type],
      class:
        combined[type] === 0
          ? 'immune'
          : combined[type] >= 4
            ? 'double-weak'
            : combined[type] > 1
              ? 'weak'
              : combined[type] === 1
                ? 'normal'
                : combined[type] > 0
                  ? 'resist'
                  : 'immune'
    }))
    .sort((a, b) => b.multiplier - a.multiplier)
})

const flavorText = computed(() => {
  const texts = poke.value?.specy?.flavor_texts
  if (!texts?.length) return ''
  const ft = texts[0].flavor_text
  return ft?.replace(/\f/g, ' ')?.replace(/\n/g, ' ') || ''
})

const eggGroups = computed(() => {
  const groups = poke.value?.specy?.egg_groups
  if (!groups?.length) return []
  return groups.map((g: any) => {
    const name = g.egg_group?.name || ''
    return name.charAt(0).toUpperCase() + name.slice(1)
  })
})

const genderRatio = computed(() => {
  const rate = poke.value?.specy?.gender_rate
  if (rate == null) return 'Unknown'
  if (rate === -1) return 'Genderless'
  const female = (rate / 8) * 100
  const male = 100 - female
  return `${male.toFixed(0)}% Male / ${female.toFixed(0)}% Female`
})

const hatchCounter = computed(() => {
  return poke.value?.specy?.hatch_counter ?? 'Unknown'
})

const captureRate = computed(() => {
  return poke.value?.specy?.capture_rate ?? 'Unknown'
})

const baseHappiness = computed(() => {
  return poke.value?.specy?.base_happiness ?? 'Unknown'
})

const forms = computed(() => {
  const fm = poke.value?.forms
  if (!fm?.length) return []
  return fm.map((f: any) => ({
    ...f,
    displayName: f.pokemon_v2_pokemonformnames?.[0]?.name || f.form_name || f.name
  }))
})

const formSprite = (f: any) => {
  const baseId = poke.value?.id
  if (!baseId) return img
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${baseId}.png`
}

const capitalize = (s: string) => {
  if (!s) return ''
  return s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const num = (order: number) => {
  if (order < 10) return `#00${order}`
  if (order < 100) return `#0${order}`
  return `#${order}`
}

function onError(e: any) {
  e.target.src = img
  e.target.style = 'margin-top: 30px;'
}

function onEvoError(e: any) {
  e.target.src = img
  e.target.style = 'width: 80px; height: 80px;'
}
</script>

<style lang="postcss">
.detail-page {
  @apply min-h-screen flex justify-center items-start py-10 px-4;
  background: #1a1a2e;
}

.detail-container {
  @apply w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl;
  background: #16213e;
}

.back-btn {
  @apply inline-block px-4 py-2 text-white text-sm no-underline;
  @apply hover:opacity-80 transition-opacity;
}

.detail-header {
  @apply flex justify-center items-center p-8;
  min-height: 300px;
}

.detail-sprite img {
  @apply drop-shadow-2xl;
  image-rendering: auto;
}

.detail-body {
  @apply text-center px-6 py-6;
}

.detail-id {
  @apply text-lg font-bold mb-1;
  color: #a0a0b0;
}

.detail-name {
  @apply text-3xl font-bold text-white mb-2;
}

.detail-genus {
  @apply text-base mb-4;
  color: #a0a0b0;
}

.detail-types {
  @apply flex justify-center gap-3 mb-4;
}

.type-badge {
  @apply px-5 py-1.5 rounded-full text-white text-sm font-semibold capitalize;
}

.detail-measurements {
  @apply flex justify-center gap-8 mt-4;
}

.measure-item {
  @apply flex flex-col items-center;
}

.measure-label {
  @apply text-xs uppercase tracking-wider;
  color: #a0a0b0;
}

.measure-value {
  @apply text-lg font-semibold text-white;
}

.detail-section {
  @apply px-6 py-5 border-t;
  border-color: #2a2a4a;
}

.section-title {
  @apply text-lg font-bold text-white mb-4;
}

.stats-grid {
  @apply flex flex-col gap-2;
}

.stat-row {
  @apply flex items-center gap-3;
}

.stat-label {
  @apply w-10 text-sm font-semibold text-right;
  color: #a0a0b0;
}

.stat-value {
  @apply w-8 text-sm font-bold text-white text-right;
}

.stat-bar-bg {
  @apply flex-1 h-3 rounded-full overflow-hidden;
  background: #2a2a4a;
}

.stat-bar-fill {
  @apply h-full rounded-full transition-all;
  background: #7ac74c;
}

.stat-total {
  @apply text-sm text-right mt-2;
  color: #a0a0b0;
}

.abilities-list {
  @apply flex flex-wrap gap-3;
}

.ability-item {
  @apply px-4 py-2 rounded-lg text-sm;
  background: #1a1a2e;
}

.ability-name {
  @apply text-white font-semibold;
}

.ability-hidden {
  @apply text-xs ml-1;
  color: #a0a0b0;
}

.evo-chain {
  @apply flex justify-center items-center flex-wrap gap-3;
}

.evo-item {
  @apply flex items-center gap-3;
}

.evo-link {
  @apply flex flex-col items-center no-underline;
}

.evo-img-wrapper {
  @apply p-2 rounded-full;
  background: #1a1a2e;
}

.evo-img-wrapper img {
  @apply block;
}

.evo-name {
  @apply text-sm text-white mt-1 text-center;
}

.evo-arrow {
  @apply text-2xl;
  color: #a0a0b0;
}

.effectiveness-grid {
  @apply grid grid-cols-3 sm:grid-cols-6 gap-2;
}

.eff-item {
  @apply px-3 py-2 rounded-lg text-center text-xs font-semibold;
}

.eff-double-weak { background: #e74c3c; color: #fff; }
.eff-weak { background: #e67e22; color: #fff; }
.eff-normal { background: #2a2a4a; color: #a0a0b0; }
.eff-resist { background: #27ae60; color: #fff; }
.eff-immune { background: #7f8c8d; color: #fff; }

.eff-type {
  @apply capitalize;
}

.eff-value {
  @apply text-xs opacity-80;
}

.moves-table-wrapper {
  @apply overflow-x-auto;
}

.moves-table {
  @apply w-full text-sm text-left;
}

.moves-table th {
  @apply px-3 py-2 text-xs uppercase tracking-wider font-semibold;
  color: #a0a0b0;
  border-bottom: 1px solid #2a2a4a;
}

.moves-table td {
  @apply px-3 py-2 text-white;
  border-bottom: 1px solid #1a1a2e;
}

.move-type {
  @apply px-2 py-0.5 rounded text-xs text-white font-semibold capitalize;
}

.flavor-text {
  @apply text-sm leading-relaxed;
  color: #c0c0d0;
}

.breeding-grid {
  @apply grid grid-cols-2 gap-4;
}

.breeding-item {
  @apply flex flex-col gap-1;
}

.breeding-label {
  @apply text-xs uppercase tracking-wider;
  color: #a0a0b0;
}

.breeding-value {
  @apply text-sm font-semibold text-white;
}

.forms-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 gap-4;
}

.form-item {
  @apply flex flex-col items-center p-3 rounded-lg;
  background: #1a1a2e;
}

.form-item img {
  @apply block;
}

.form-name {
  @apply text-sm text-white text-center mt-1 capitalize;
}

.form-badge {
  @apply text-xs px-2 py-0.5 rounded-full mt-1;
  background: #e74c3c;
  color: #fff;
}

.type-normal { background: var(--normal); }
.type-fire { background: var(--fire); }
.type-water { background: var(--water); }
.type-electric { background: var(--electric); }
.type-grass { background: var(--grass); }
.type-ice { background: var(--ice); }
.type-fighting { background: var(--fighting); }
.type-poison { background: var(--poison); }
.type-ground { background: var(--ground); }
.type-flying { background: var(--flying); }
.type-psychic { background: var(--psychic); }
.type-bug { background: var(--bug); }
.type-rock { background: var(--rock); }
.type-ghost { background: var(--ghost); }
.type-dragon { background: var(--dragon); }
.type-dark { background: var(--dark); }
.type-steel { background: var(--steel); }
.type-fairy { background: var(--fairy); }
</style>
