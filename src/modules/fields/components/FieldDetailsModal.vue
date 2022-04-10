<template>
  <right-side-modal
    class="field-details-modal"
    :is-visible="show"
    :max-width="'auto'"
    @onClose="closeModal"
  >
    <h3 class="mt-0">Basic information</h3>
    <div class="data-grid">
      <data-group
        v-for="({ label, value}, index) in fieldValues"
        :key="index"
        :label="label"
        :value="value"
      />
    </div>
    <div class="data-grid mt-15">
      <sensor-card
        v-for="(sensor, index) in field.sensors"
        :key="index"
        :sensor="sensor"
      />
    </div>
  </right-side-modal>
</template>

<script>
import { computed } from 'vue'
import DataGroup from '@/components/atoms/DataGroup'
import RightSideModal from '@/components/molecules/RightSideModal'
import SensorCard from '@/modules/sensors/components/SensorCard'

export default {
  name: 'FieldDetailsModal',
  components: {
    DataGroup,
    RightSideModal,
    SensorCard
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
      { label: 'Name', value: props.field.title },
      { label: 'Size', value: props.field.size },
      { label: 'Company', value: props.field.company.name },
      { label: 'Manager', value: props.field.manager.name }
    ])
    /**
     * Function triggered by framework when modal is closed
     * @param value
     */
    const closeModal = value => emit('onClose', value)
    const noteLabel = ({ type, createdDate }) => `${type} • ${createdDate}`
    return {
      show,
      closeModal,
      fieldValues,
      noteLabel
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
