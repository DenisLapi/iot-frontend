<template>
  <right-side-modal
    :is-visible="show"
    :max-width="'auto'"
    @onClose="closeModal"
  >
    <div class="data-grid">
      <data-group
        v-for="({ label, value}, index) in fieldValues"
        :key="index"
        :label="label"
        :value="value"
      />
    </div>
  </right-side-modal>
</template>

<script>
import { computed } from 'vue'
import DataGroup from '@/components/atoms/DataGroup'
import RightSideModal from '@/components/molecules/RightSideModal'

export default {
  name: 'FieldDetailsModal',
  components: {
    DataGroup,
    RightSideModal
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    field: {
      type: Object,
      required: true
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
    const fieldValues = computed(() => [
      { label: 'Title', value: props.field.title },
      { label: 'Size', value: props.field.size },
      { label: 'Company', value: props.field.company.name },
      { label: 'Manager', value: props.field.manager.name }
    ])
    /**
     * Function triggered by framework when modal is closed
     * @param value
     */
    const closeModal = value => emit('onClose', value)
    return {
      show,
      closeModal,
      fieldValues
    }
  }
}
</script>

<style scoped>
.data-grid {
  display: grid;
  grid-template-columns: 50% 50%;
}
</style>
