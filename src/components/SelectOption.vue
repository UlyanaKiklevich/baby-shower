<template>
  <div class="flex items-center">
    <input
        type="radio"
        class="mr-2 select-option"
        :id="option.key"
        name="name"
        :value="modelValue"
        @input="$emit('update:modelValue', option.key)"
    />
    <label :for="option.key">
      <img :src="`names/${image}.png`" class="max-h-[50px]"/>
    </label>
  </div>
</template>
<script setup>
import {computed, defineProps} from 'vue';
import useMessenger from "../../composables/useMessenger";

const props = defineProps({
  option: Object,
  modelValue: [ Object, String ]
})

const { user } = useMessenger()

const image = computed(() => {
  if (props.option.key === user.value) {
    return 'me'
  }

  return props.option.key
})
</script>
