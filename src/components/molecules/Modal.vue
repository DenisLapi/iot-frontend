<template>
  <o-modal
    class="modal-wrapper"
    scroll="clip"
    v-model:active="show"
    :width="1000"
    @on-close="closeModal"
  >
    <slot></slot>
  </o-modal>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Modal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: Number,
      default: 1500
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
    /**
     * Function triggered by framework when modal is closed
     * @param value
     */
    const closeModal = value => emit('onClose', value)
    return {
      show,
      closeModal
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  ::v-deep .o-modal__content {
    border-radius: 5px;
    padding: 30px;
    overflow-y: auto;
  }
}
</style>
