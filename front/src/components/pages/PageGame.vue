<template>
  <div class="py-[70px] font-cookie flex flex-col h-screen overflow-y-auto">
    <AppHeader :counter="counter"/>
    <div class="content p-2 bg-[#FFFBF6] grow flex flex-wrap gap-2 justify-around">
      <SelectOption
          v-for="option in sortedNames"
          v-model="selectedOption"
          :key="option.key"
          :option="option"
      />
    </div>
    <AppFooter
        :option="selectedOption"
        :counter="counter"
        @clear="clearInput"
    />
    <router-view/>
  </div>
</template>

<script setup>
import AppHeader from '@/src/components/AppHeader'
import AppFooter from '@/src/components/AppFooter'
import SelectOption from '@/src/components/SelectOption'
import {computed, onMounted, ref} from 'vue'
import names from '../../../data/names.json'
import useMessenger from '../../../composables/useMessenger'

const selectedOption = ref()
const counter = ref(0)

const clearInput = () => {
  selectedOption.value = null
  document.querySelectorAll(`.select-option`).forEach(el => el.checked = false)
  counter.value++
}

const {user} = useMessenger()

onMounted(() => {
  let recaptchaScript = document.createElement('script')
  recaptchaScript.setAttribute('src', 'https://cdn.ably.com/lib/ably.min-1.js')
  document.head.appendChild(recaptchaScript)
})

const sortedNames = computed(() => {
  if (counter.value > 0) {
    return names.sort(el => {
      if (el.key === user.value) {
        return -1
      }
    })
  }

  return names
})
</script>
