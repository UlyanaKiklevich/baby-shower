<template>
  <div class="pt-[70px] flex flex-col h-screen">
    <AppHeader :counter="counter" admin />
    <div class="relative content p-2 bg-[#FFFBF6] grow flex flex-wrap gap-2 justify-around max-h-full">
      <img :src="`images/${questions[counter].src}`"
           class="h-full m-auto"
           :class="{
              'pullUp': !enableAnimation,
              'slideLeft': enableAnimation
           }"
      />
      <div class="absolute text-green-500 text-[10rem]"
           v-show="score >= 0"
           :class="{
             'pulse': scoreAnimation
           }"
      >
        {{ score }}%
      </div>
    </div>
  </div>
</template>
<script setup>
import AppHeader from '@/src/components/AppHeader'
import {onMounted, ref} from "vue";
import questions from '../../../data/questions'
import useMessenger from "@/composables/useMessenger";

const counter = ref(1)

const enableAnimation = ref(false)
const scoreAnimation = ref(false)

const score = ref(-1)

const { results } = useMessenger()
console.log(results)

onMounted(() => {
  document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
      if (enableAnimation.value) {
        enableAnimation.value = false
        score.value = -1
        scoreAnimation.value = false
        counter.value ++
      } else {
        let targetValue = 50
        setTimeout(() => {
          const interval = setInterval(() => {
            score.value += 1
            if (score.value >= targetValue) {
              clearInterval(interval)
              scoreAnimation.value = true
            }
          }, 2000 / targetValue)
        }, 1000)

        enableAnimation.value = true
      }

    }
  })
})
</script>

