<template>
  <TransitionGroup
    appear
    tag="div"
    @before-enter="beforeEnter"
    @enter="onEnter"
    class="flex flex-row flex-wrap justify-center gap-10 fade-slow"
    v-if="show"
  >
    <div v-for="(mons, index) in props.datas" :key="mons.id" :data-index="index">
      <!-- {{ JSON.parse(mons.image[0].sprites).other['official-artwork'].front_default }} -->
      <!-- <nuxt-link :to="`/detail/${mons.id}`" no-prefetch> -->
      <div :class="`card ${mons.type[0].pokemon_v2_type.name}-bg`">
        <div class="poke-img">
          <!-- {{ image }} -->
          <!-- {{ JSON.parse(mons.image[0].sprites).other['official-artwork'].front_default  }} -->
          <!-- <img v-if="JSON.parse(mons.image[0].sprites).other['official-artwork'].front_default" :src="JSON.parse(mons.image[0].sprites).other['official-artwork'].front_default" @error="onError" width="200" height="200" alt="" /> -->
          <!-- <img :src="`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/official-artwork/${mons.id}.png`" @error="onError" width="200" height="200" alt="" /> -->
          <img
            v-if="
              JSON.parse(mons.image[0].sprites).other['official-artwork'].front_default
            "
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/${imageReplaceString(
              JSON.parse(mons.image[0].sprites).other['official-artwork'].front_default
            )}`"
            @error="onError"
            width="200"
            height="200"
            alt=""
          />
          <img
            v-else
            data-src="@/assets/img/pokedex_logo.png"
            style="margin-top: 100px"
            width="200"
            height="200"
            alt=""
          />
        </div>
        <div :class="`card-title ${mons.type[0].pokemon_v2_type.name}-card-bg`">
          <div class="card-title-poke-text">
            <div :class="`${mons.type[0].pokemon_v2_type.name}`">
              {{ num(mons.id) }}
            </div>
            <div class="truncate">
              {{ mons.name.charAt(0).toUpperCase() + mons.name.slice(1) }}
            </div>
          </div>
        </div>
      </div>
      <!-- </nuxt-link> -->
    </div>
    <!-- <div class="poke-img">
      <img v-if="image" :src="image" @error="onError" width="200" height="200" alt="" />
      <img v-else src="@/assets/img/pokedex_logo.png" style="margin-top: 100px" width="200" height="200" alt="" />
    </div>

    <div :class="`card-title ${type}-card-bg`">
      <div class="card-title-poke-text">
        <div :class="`${type}`">
          {{ num }}
        </div>
        <div>
          {{ props.datas.name.charAt(0).toUpperCase() + props.datas.name.slice(1) }}
        </div>
      </div>
    </div> -->

    <!-- {{ props.datas.pokemon_v2_pokemonsprites[0].sprites }} -->
  </TransitionGroup>
</template>

<script lang="ts" setup>
import img from '@/assets/img/pokedex_logo.png'
import { gsap } from 'gsap'

const show = ref(false)
onMounted(() => {
  show.value = true
})

const props = defineProps({
  datas: {
    type: Array,
    default: [],
  },
})

const imageReplaceString = (data: any) => {
  console.log('data', data)
  return data.replace('media/', '')
}

const num = (order: number) => {
  if (order < 10) {
    return `#00${order}`
  }
  if (order < 100) {
    return `#0${order}`
  }
  if (order >= 100) {
    return `#${order}`
  }
}

function onError(e: any) {
  // e.target.src = 'https://www.foodstation.id/wp-content/uploads/2021/06/3-300x300.png'
  e.target.src = img
  e.target.style = 'margin-top:100px;'
}

// const type = computed(() => {
//   let a
//   a = props.datas.map((item) => item.type[0].pokemon_v2_type.name)
//   // console.log(a)
//   return a
// })

function beforeEnter(el) {
  el.style.opacity = 0
  el.style.transform = 'translateX(-100px)'
}

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    x: 0,
    duration: 0.5,
    onComplete: done,
    delay: el.dataset.index * 0.1,
  })
}

// function onLeave(el, done) {
//   gsap.to(el, {
//     opacity: 0,
//     height: 0,
//     delay: el.dataset.index * 0.1,
//     onComplete: done
//   })
// }
</script>
<style lang="postcss">
:root {
  --normal: #a8a77a;
  --fire: #ee8130;
  --water: #6390f0;
  --electric: #f7d02c;
  --grass: #7ac74c;
  --ice: #96d9d6;
  --fighting: #c22e28;
  --poison: #a33ea1;
  --ground: #e2bf65;
  --flying: #a98ff3;
  --psychic: #f95587;
  --bug: #a6b91a;
  --rock: #b6a136;
  --ghost: #735797;
  --dragon: #6f35fc;
  --dark: #705746;
  --steel: #b7b7ce;
  --fairy: #d685ad;
}
.card {
  @apply block p-3 w-80 h-52 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 my-10 mx-auto relative flex flex-row justify-center;
}

.fade-slow-enter {
  opacity: 0;
}
.fade-slow-enter-active {
  transition: all 2s ease;
}
.fade-slow-enter-to {
  opacity: 1;
}

.card:hover {
  @apply drop-shadow-2xl cursor-pointer;
  .poke-img {
    transform: scale(1.2);
    transition: transform 0.5s ease-in-out;
  }
  .card-title {
    background-position: -100% 0;
    filter: contrast(1.75);
    border: 1.5px solid silver;
  }
}

.poke-img {
  @apply absolute -top-20;
  &-error {
    @apply absolute top-10;
  }
}

.card-title {
  @apply absolute bottom-5;
  @apply block p-2 w-60 h-10 rounded-md shadow-lg;
  /* background-image: linear-gradient(90deg, rgb(71 85 105) 75%, rgb(31 41 55)); */
  background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--normal));
  background-size: 200% 100%;
  -webkit-transition: background-position 0.5s;
  -moz-transition: background-position 0.5s;
  transition: background-position 0.5s;

  &-poke-text {
    @apply text-center flex text-white flex-row justify-around;
  }
}

.card-title:hover {
  background-position: 0 100%;
}

.normal {
  color: var(--normal);
  &-bg {
    background-image: linear-gradient(210deg, var(--normal), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--normal), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(60deg, rgb(71 85 105) 90%, var(--normal));
  }
}
.fire {
  color: var(--fire);
  &-bg {
    background-image: linear-gradient(210deg, var(--fire), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--fire), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(60deg, rgb(71 85 105) 90%, var(--fire));
  }
}
.water {
  color: var(--water);
  &-bg {
    background-image: linear-gradient(210deg, var(--water), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--water), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(60deg, rgb(71 85 105) 90%, var(--water));
  }
}
.electric {
  color: var(--electric);
  &-bg {
    background-image: linear-gradient(210deg, var(--electric), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--electric), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(60deg, rgb(71 85 105) 90%, var(--electric));
  }
}
.grass {
  color: var(--grass);
  &-bg {
    background-image: linear-gradient(210deg, var(--grass), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--grass), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(60deg, rgb(71 85 105) 90%, var(--grass));
  }
}
.ice {
  color: var(--ice);
  &-bg {
    background-image: linear-gradient(210deg, var(--ice), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--ice), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(60deg, rgb(71 85 105) 90%, var(--ice));
  }
}
.fighting {
  color: var(--fighting);
  &-bg {
    background-image: linear-gradient(210deg, var(--fighting), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--fighting), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--fighting));
  }
}
.poison {
  color: var(--poison);
  &-bg {
    background-image: linear-gradient(210deg, var(--poison), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--poison), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--poison));
  }
}
.ground {
  color: var(--ground);
  &-bg {
    background-image: linear-gradient(210deg, var(--ground), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--ground), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--poison));
  }
}
.flying {
  color: var(--flying);
  &-bg {
    background-image: linear-gradient(210deg, var(--flying), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--flying), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--flying));
  }
}
.psychic {
  color: var(--psychic);
  &-bg {
    background-image: linear-gradient(210deg, var(--psychic), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--psychic), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--psychic));
  }
}
.bug {
  color: var(--bug);
  &-bg {
    background-image: linear-gradient(210deg, var(--bug), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--bug), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--bug));
  }
}
.rock {
  color: var(--rock);
  &-bg {
    background-image: linear-gradient(210deg, var(--rock), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--rock), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--rock));
  }
}

.ghost {
  color: var(--ghost);
  &-bg {
    background-image: linear-gradient(210deg, var(--ghost), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--ghost), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--ghost));
  }
}

.dragon {
  color: var(--dragon);
  &-bg {
    background-image: linear-gradient(210deg, var(--dragon), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--dragon), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--dragon));
  }
}

.dark {
  color: var(--dark);
  &-bg {
    background-image: linear-gradient(210deg, var(--dark), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--dark), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--dark));
  }
}

.steel {
  color: var(--grass);
  &-bg {
    background-image: linear-gradient(210deg, var(--steel), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--steel), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--steel));
  }
}

.fairy {
  color: var(--fairy);
  &-bg {
    background-image: linear-gradient(210deg, var(--fairy), 75%, white);
    background-size: 100% 200%;
    -webkit-transition: background-position 0.5s;
    -moz-transition: background-position 0.5s;
    transition: background-position 0.5s;
  }
  &-bg:hover {
    background-image: linear-gradient(210deg, var(--fairy), 90%, white);
    background-position: 0 100%;
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--fairy));
  }
}
</style>
