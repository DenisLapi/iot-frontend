<template>
  <modal
    :is-visible="show"
    @close="value => $emit('close', value)"
  >
    <slot />
  </modal>
</template>

<script>
import Modal from '@/components/molecules/Modal'
import { computed } from 'vue'

export default {
  name: 'FieldDetailsModal',
  components: {
    Modal
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const show = computed({
      get () {
        return props.isVisible
      },
      set (value) {
        emit('close', value)
      }
    })
    return {
      show
    }
  }
}
</script>

<style scoped>

</style>
