<template>
  <right-side-modal
    :is-visible="show"
    :max-width="'auto'"
    @on-close="closeModal"
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
        v-for="(sensor, index) in fieldRef.sensors"
        :key="index"
        :sensor="sensor"
        @on-change="newValue => updateSensor(newValue, index)"
      />
    </div>
  </right-side-modal>
</template>

<script>
import {
  computed,
  watch,
  ref
} from 'vue'
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
    const fieldRef = ref(props.field)
    const fieldValues = computed(() => [
      { label: 'Name', value: fieldRef.value.title },
      { label: 'Size', value: fieldRef.value.size },
      { label: 'Company', value: fieldRef.value.company.name },
      { label: 'Manager', value: fieldRef.value.manager.name }
    ])
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

    /**
     * Function generates note label
     * @param type
     * @param createdDate
     * @returns {`${string} • ${string}`}
     */
    const noteLabel = ({ type, createdDate }) => `${type} • ${createdDate}`

    /**
     * Update sensor value in sensors list
     * @param newValue Sensor object value
     * @param index Index in sensors list
     */
    const updateSensor = (newValue, index) => {
      fieldRef.value.sensors[index] = newValue
      emit('onChange', fieldRef.value)
    }

    watch(show, isVisible => {
      if (isVisible) {
        fieldRef.value = props.field
      }
    })

    return {
      fieldRef,
      fieldValues,
      show,
      closeModal,
      noteLabel,
      updateSensor
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
