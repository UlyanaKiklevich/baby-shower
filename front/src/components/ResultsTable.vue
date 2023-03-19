<template>
  <div>
    <table>
      <thead>
        <th>User</th>
        <th v-for="index in questionsAmount" :key="index" v-text="`#${index}`"/>
      </thead>
      <tbody>
        <tr v-for="name in Object.keys(results)" :key="name">
          <td >
            {{name}}
          </td>
          <td v-for="index in questionsAmount" :key="index" class="text-center">
            <template v-if="results[name][index - 1]">
              <template v-if="results[name][index - 1].isCorrect">
                ✅
              </template>
              <template v-else>
                ❌
              </template>
            </template>
          </td>
        </tr>
        <tr>
          <td> Totals </td>
          <td v-for="(total, index) in totals" :key="total + index" class="text-center">
            <span :class="{
              'text-green-600': total === names.length,
              'text-rose-600': total !== names.length
            }">
              {{total}}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="addAnswer('ula', counter++, 'nastka')"> add answer ula </button>
    <br/>
    <button @click="addAnswer('żenia', counter++, 'nastka')"> add answer żenia </button>
    <br/>
    <button @click="addAnswer('nastka', counter++, 'nastka')"> add answer nastka </button>
  </div>
</template>

<script setup>
import useMessenger from '@/composables/useMessenger'
import { computed, ref } from 'vue'
import questions from '@/data/questions.json'

const { results, addUser, addAnswer } = useMessenger()
const questionsAmount = questions.length

addUser('ula')
addUser('żenia')
addUser('nastka')
const counter = ref(1)
const names = computed(() => Object.keys(results.value))

const totals = computed(() => {
  const totals = new Array(questionsAmount).fill(0)

 for (let i = 0; i < questionsAmount; i++) {
    for (let j = 0; j < names.value.length; j++) {
      if (results.value[names.value[j]][i]) {
        totals[i]++
      }
    }
  }

  return totals
})

</script>
<style>
table, td, th {
  border: 1px solid;
}

table {
  width: 100%;
  border-collapse: collapse;
}
</style>
