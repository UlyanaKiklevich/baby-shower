<template>
  <footer class="fixed bottom-0 left-0 right-0 h-[70px] py-2 bg-[#F0EBE6] flex items-center justify-center">
    <button
        :disabled="!activeOption"
        type="button" @click="submit" class="submit-button rounded-2xl bg-[#A96245] text-4xl w-[80%] text-white h-[40px]">
        Submit
    </button>
  </footer>
</template>
<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import useMessenger from '../../composables/useMessenger'

const props = defineProps({
  option: String,
  counter: Number
})

const { publish, createChannel } = useMessenger()

const activeOption = computed(() => props.option)
const emit = defineEmits({
  clear: () => true
})

const submit = () => {
  if (props.counter > 0) {
    publish(activeOption.value)
  } else {
    createChannel(activeOption.value)
  }
  emit('clear')
}

</script>

<style>
footer {
  box-shadow: 0 -12px 15px rgba(0, 0, 0, 0.05);
}

.submit-button {
  box-shadow: 0 0px 10px 0 #A96245;
  transition: all .5s;
}

.submit-button:disabled {
  color: rgb(196 196 196);
  background-color: rgb(245 245 245);
  box-shadow: 0 0px 10px 0 #000;
}
</style>
