<template>
  <modal
    class="field-details-modal"
    :is-visible="show"
    :width="maxWidth"
    @close="value => $emit('onClose', value)"
  >
    <div class="field-details-modal__grid">
      <data-group
        v-for="({ label, value }, index) in details"
        :key="index"
        :label="label"
        :value="value"
      />
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/molecules/Modal'
import DataGroup from '@/components/molecules/DataGroup'
import { computed } from 'vue'

export default {
  name: 'FieldDetailsModal',
  components: {
    Modal,
    DataGroup
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
    const details = computed(_ => [
      {
        label: 'Title',
        value: props.field.title
      },
      {
        label: 'Size',
        value: props.field.size
      },
      {
        label: 'Company name',
        value: props.field.company.name
      },
      {
        label: 'Manager',
        value: props.field.manager.name
      }
    ])
    return {
      show,
      details
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
  &__grid {
    display: grid;
    grid-template-columns: 50% 50%;
  }
}
</style>
