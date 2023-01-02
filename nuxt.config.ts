// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  ssr: false,
  modules: ['@nuxtjs/apollo', '@nuxtjs/tailwindcss'],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://beta.pokeapi.co/graphql/v1beta',
        connectToDevTools: true
      }
    }
  },
  runtimeConfig:{
    public: {
      gtm_id: 'GTM-NX6BJWN',
      gtm_enabled: true,
      gtm_debug: true
    }    
  }
})
