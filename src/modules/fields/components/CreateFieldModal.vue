<template>
  <right-side-modal
    class="field-details-modal"
    :is-visible="show"
    :max-width="'auto'"
    @on-close="closeModal"
  >
    Hello world
  </right-side-modal>
</template>

<script>
import { computed } from 'vue'
import RightSideModal from '@/components/molecules/RightSideModal'

export default {
  name: 'FieldDetailsModal',
  components: {
    RightSideModal
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
.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 49%);
  column-gap: 2%;
  row-gap: 13px;
}
h3 {
  margin: 15px 0;
}
.mt-0 {
  margin-top: 0;
}
.mt-15 {
  margin-top: 15px;
}
</style>
