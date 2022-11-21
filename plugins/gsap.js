import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { defineNuxtPlugin } from '#app'

gsap.registerPlugin(Flip)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      gsap: gsap
    }
  }
})
