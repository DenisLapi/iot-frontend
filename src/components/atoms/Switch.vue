<template>
  <o-switch v-model="switchValue" />
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Switch',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  setup (props, { emit }) {
    const switchValue = computed({
      get () {
        return props.value
      },
      set (value) {
        emit('input', value)
      }
    })
    return {
      switchValue
    }
  }
}
</script>
