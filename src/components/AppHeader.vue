<template>
  <header class="h-[70px] px-4 py-2 bg-[#F0EBE6] text-5xl text-[#A96245] text-center fixed top-0 left-0 right-0 flex justify-between items-center">
    <img src="Bear.png" class="h-full" />
    <div v-if="counter > 0"> #{{ counter }} </div>
    <div v-else>
      Who are you?
    </div>
  </header>
</template>
<script setup>
import { defineProps } from 'vue';
defineProps({
  counter: Number
})
</script>
<style>
header {
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
}
</style>
