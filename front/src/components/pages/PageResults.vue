<template>
  <div class="bg-[#FFFBF6] p-8 font-cookie flex flex-col h-screen overflow-y-auto text-5xl gap-4">
    <div
        class="flex "
        v-for="el in statistics"
        :key="el.name"
    >
      <div class="w-[300px]">
        {{el.name}}
      </div>
      <div class="grow">
        <div
            class="bg-[#A96245] h-full test"
            :style="[ runStatistics ? { 'width': el.score + '%' } : {} ]"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import useMessenger from '@/composables/useMessenger'
import {computed, ref} from "vue";

const { results, addUser, addAnswer, userCorrectStatistics, getName } = useMessenger()

addUser('ula')
addAnswer('ula', 0, 'alesia')
addAnswer('ula', 1, 'alesia')
addUser('alesia')
addAnswer('alesia', 0, 'ula')
addAnswer('alesia', 1, 'ula')

const runStatistics = ref(false)

const statistics = computed(() => {
  const els = [],
        keys = Object.keys(results.value)

  for (let i = 0; i < keys.length; i++) {
    const result = keys[i]
    const score = userCorrectStatistics(result)

    if (els.length && score > els[i - 1].score) {
      els.unshift({
        name: getName(result),
        score
      })
    } else {
      els.push({
        name: getName(result),
        score
      })
    }
  }

  return els
})

setTimeout(() => {
  runStatistics.value = true
}, 1000)

</script>
<style>
.test {
  width: 0%;
  transition: width 1s ease-in-out;
}
</style>
