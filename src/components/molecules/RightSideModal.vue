<template>
  <o-modal
    class="right-side-modal"
    scroll="clip"
    v-model:active="show"
    :width="maxWidth"
    @on-close="closeModal"
  >
    <slot></slot>
  </o-modal>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'RightSideModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: [Number, String],
      default: 640
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

    /**
     * Function triggered by framework when modal is closed
     * @param value
     */
    const closeModal = value => emit('close', value)

    return {
      show,
      closeModal
    }
  }
}
</script>

<style lang="scss" scoped>
.right-side-modal {
  ::v-deep .o-modal__overlay {
    //display: none;
  }
  ::v-deep .o-modal__content {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 650px;
    height: calc(100vh - 20px);
    max-height: calc(100vh - 20px);
    padding: 30px;
    overflow-y: auto;
  }
}
</style>
