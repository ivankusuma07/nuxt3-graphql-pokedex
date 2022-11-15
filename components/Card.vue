<template>
  <div :class="`card ${type}-bg`">
    <div class="poke-img">
      <img :src="`${JSON.parse(props.datas.image[0].sprites).other.home.front_default}`" width="200" height="200" alt="" />
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
    </div>

    <!-- {{ props.datas.pokemon_v2_pokemonsprites[0].sprites }} -->
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  datas: {
    type: Object,
    default: {}
  }
})

// const init = async () => {
//   console.log(props.datas)
// }
// init()
const num = computed(() => {
  if (props.datas.order < 10) {
    return `#00${props.datas.order}`
  }
  if (props.datas.order < 100) {
    return `#0${props.datas.order}`
  }
  if (props.datas.order >= 100) {
    return `#${props.datas.order}`
  }
})

const type = computed(() => {
  return props.datas.type[0].pokemon_v2_type.name
})
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

.card:hover {
  @apply shadow-2xl cursor-pointer;
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
  }
  &-card-bg {
    background-image: linear-gradient(60deg, rgb(71 85 105) 90%, var(--fire));
  }
}
.water {
  color: var(--water);
  &-bg {
    background-image: linear-gradient(210deg, var(--water), 75%, white);
  }
  &-card-bg {
    background-image: linear-gradient(60deg, rgb(71 85 105) 90%, var(--water));
  }
}
.electric {
  color: var(--electric);
  &-bg {
    background-image: linear-gradient(210deg, var(--electric), 75%, white);
  }
  &-card-bg {
    background-image: linear-gradient(60deg, rgb(71 85 105) 90%, var(--electric));
  }
}
.grass {
  color: var(--grass);
  &-bg {
    background-image: linear-gradient(210deg, var(--grass), 75%, white);
  }
  &-card-bg {
    background-image: linear-gradient(60deg, rgb(71 85 105) 90%, var(--grass));
  }
}
.ice {
  color: var(--ice);
  &-bg {
    background-image: linear-gradient(210deg, var(--ice), 75%, white);
  }
  &-card-bg {
    background-image: linear-gradient(60deg, rgb(71 85 105) 90%, var(--ice));
  }
}
.fighting {
  color: var(--fighting);
  &-bg {
    background-image: linear-gradient(210deg, var(--fighting), 75%, white);
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--fighting));
  }
}
.poison {
  color: var(--poison);
  &-bg {
    background-image: linear-gradient(210deg, var(--poison), 75%, white);
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--poison));
  }
}
.ground {
  color: var(--ground);
  &-bg {
    background-image: linear-gradient(210deg, var(--ground), 75%, white);
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--poison));
  }
}
.flying {
  color: var(--flying);
  &-bg {
    background-image: linear-gradient(210deg, var(--flying), 75%, white);
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--flying));
  }
}
.psychic {
  color: var(--psychic);
  &-bg {
    background-image: linear-gradient(210deg, var(--psychic), 75%, white);
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--psychic));
  }
}
.bug {
  color: var(--bug);
  &-bg {
    background-image: linear-gradient(210deg, var(--bug), 75%, white);
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--bug));
  }
}
.rock {
  color: var(--rock);
  &-bg {
    background-image: linear-gradient(210deg, var(--rock), 75%, white);
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--rock));
  }
}

.ghost {
  color: var(--ghost);
  &-bg {
    background-image: linear-gradient(210deg, var(--ghost), 75%, white);
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--ghost));
  }
}

.dragon {
  color: var(--dragon);
  &-bg {
    background-image: linear-gradient(210deg, var(--dragon), 75%, white);
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--dragon));
  }
}

.dark {
  color: var(--dark);
  &-bg {
    background-image: linear-gradient(210deg, var(--dark), 75%, white);
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--dark));
  }
}

.steel {
  color: var(--grass);
  &-bg {
    background-image: linear-gradient(210deg, var(--steel), 75%, white);
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--steel));
  }
}

.fairy {
  color: var(--fairy);
  &-bg {
    background-image: linear-gradient(210deg, var(--fairy), 75%, white);
  }
  &-card-bg {
    background-image: linear-gradient(90deg, rgb(71 85 105) 90%, var(--fairy));
  }
}
</style>
