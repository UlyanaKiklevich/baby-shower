<template>
  <div class="pt-[70px] flex flex-col h-screen">
    <AppHeader :counter="counter + 1" admin />
    <button @click="addAnswer('ula', counter, 'nastka')"> add answer ula </button>
    <br/>
    <button @click="addAnswer('żenia', counter, 'wlad')"> add answer żenia </button>
    <br/>
    <button @click="addAnswer('nastka', counter, 'obuchowski')"> add answer nastka </button>
    <div class="relative content p-2 bg-[#FFFBF6] grow flex flex-wrap gap-2 justify-around max-h-full">
      <div class="absolute flex gap-4 top-1 bottom-1 w-full justify-center" :class="{
        'slideLeft justify-between': enableAnimation
      }">
        <img :src="`images/${questions[counter].src}`"
             class="h-full"
             :class="{
              'pullUp': !enableAnimation
           }"
        />
        <div class="text-[10rem] grow text-center"
             v-if="!startAgain"
             v-show="score >= 0"
             :class="{
              'pulse': scoreAnimation,
              'text-green-500': score > 0,
              'text-red-500': score === 0,
             }"
        >
          {{ score }}%
        </div>
        <div class="grow text-center"
             v-if="startAgain"
        >
          <div class="text-green-500 text-[10rem]"
               :class="{
                'pulse': scoreAnimation
                }">
            {{ getName(questions[counter].answer) }}
            <span :class="{
              'text-red-500': getCorrectPercentage(counter) === 0
            }">{{ getCorrectPercentage(counter) }} %</span>
          </div>
          <div class="slideRight text-red-500 text-5xl" v-if="otherNames.length">
            <div v-for="name in otherNames" v-text="name" :key="name" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import AppHeader from '@/src/components/AppHeader'
import { onMounted, ref } from 'vue'
import questions from '@/data/questions'
import useMessenger from '@/composables/useMessenger'
import router from "@/src/router";

const counter = ref(0)

const enableAnimation = ref(false)
const scoreAnimation = ref(false)
const startAgain = ref(false)

const score = ref(-1)

const { addAnswer, getCorrectPercentage, howWasCalled, getName } = useMessenger()

onMounted(() => {
  document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
      if (counter.value >= questions.length - 1 && enableAnimation.value) {
        counter.value = 0
        startAgain.value = true
        enableAnimation.value = false
        score.value = -1
        otherNames.value = []
        setTimeout(() => {
          otherNames.value = howWasCalled(questions[counter.value].answer, counter.value)
        }, 1000)
        return
      }

      if (startAgain.value && counter.value < questions.length - 1) {
        counter.value ++
        otherNames.value = []
        setTimeout(() => {
          otherNames.value = howWasCalled(questions[counter.value].answer, counter.value)
        }, 1000)
        return
      }

      if (startAgain.value && counter.value === questions.length - 1) {
        router.push({ path: '/results' })
      }


      if (enableAnimation.value) {
        enableAnimation.value = false
        score.value = -1
        scoreAnimation.value = false
        counter.value ++
      } else {
        let targetValue = getCorrectPercentage(counter.value)
        setTimeout(() => {
          const interval = setInterval(() => {
            score.value += 1
            if (score.value >= targetValue) {
              clearInterval(interval)
              scoreAnimation.value = true
            }
          }, 1500 / targetValue)
        }, 1000)

        enableAnimation.value = true
      }

    }
  })
})

const otherNames = ref([])
</script>

