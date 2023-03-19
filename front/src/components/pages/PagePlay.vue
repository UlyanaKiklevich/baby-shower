<template>
  <div class="pt-[70px] flex flex-col h-screen">
    <AppHeader :counter="counter + 1" admin />
    <div class="relative content p-2 bg-[#FFFBF6] grow flex flex-wrap gap-2 justify-around max-h-full">
      <div class="absolute flex gap-4 top-1 bottom-1 w-full justify-center" :class="{
        'slideLeft justify-between': enableAnimation
      }">
        <img :src="`images/${questionShuffled[counter].src}`"
             class="h-full"
             :class="{
              'pullUp': !enableAnimation
           }"
        />
        <div class="text-green-500 text-[10rem] grow text-center"
             v-if="!startAgain"
             v-show="score >= 0"
             :class="{
             'pulse': scoreAnimation
           }"
        >
          {{ score }}%
        </div>
        <div class="text-green-500 text-[10rem] grow text-center"
             v-if="startAgain"
             :class="{
             'pulse': scoreAnimation
           }"
        >
          {{ getName(questionShuffled[counter].answer) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import AppHeader from '@/src/components/AppHeader'
import {onMounted, ref} from "vue";
import questions from '@/data/questions'
import names from '@/data/names'
import useMessenger from '@/composables/useMessenger'
import _ from 'underscore'

const counter = ref(0)

const enableAnimation = ref(false)
const scoreAnimation = ref(false)
const startAgain = ref(false)

const score = ref(-1)

const { results } = useMessenger()
console.log(results)

const questionShuffled = _.shuffle(questions)

onMounted(() => {
  document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
      if (counter.value >= questions.length - 1 && enableAnimation.value) {
        counter.value = 0
        startAgain.value = true
        enableAnimation.value = false
        score.value = -1
        return
      }

      if (startAgain.value) {
        counter.value ++
        return
      }

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

const getName = answer => {
  const title = names.find(({ key }) => key === answer).title

  return Array.isArray(title) ? title.join(' & ') : title
}
</script>

