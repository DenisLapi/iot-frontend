<template>
  <modal
    :is-visible="show"
    @close="value => $emit('onClose', value)"
  >
    Field name: {{ field.name }}
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
    field: {
      type: Object,
      required: true
    },
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
        emit('onClose', value)
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
