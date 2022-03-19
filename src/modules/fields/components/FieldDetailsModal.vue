<template>
  <modal
    class="field-details-modal"
    :is-visible="show"
    :width="maxWidth"
    @close="value => $emit('onClose', value)"
  >
    <p>Field title</p>
    <p>{{ field.title }}</p>

    <p>Field size</p>
    <p>{{ field.size }}</p>

    <p>Company name</p>
    <p>{{ field.company.name }}</p>
    <hr>
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
    },
    maxWidth: {
      type: Number,
      default: 640
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

<style lang="scss" scoped>
.field-details-modal {
  ::v-deep .o-modal__content {
    width: 500px;
    padding: 15px;
  }
}
</style>
