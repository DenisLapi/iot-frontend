<template>
  <modal
    class="field-details-modal"
    :is-visible="show"
    :width="maxWidth"
    @close="value => $emit('onClose', value)"
  >
    <h3>Basic details</h3>
    <div class="field-details-modal__grid">
      <data-group
        v-for="({ label, value }, index) in details"
        :key="index"
        :label="label"
        :value="value"
      />
    </div>
    <h3>Sensors</h3>
    <sensor-details-row
      class="field-details-modal__sensor"
      v-for="({ name, type, status }, index) in sensors"
      :key="index"
      :name="name"
      :type="type"
      :status="status"
    />
  </modal>
</template>

<script>
import Modal from '@/components/molecules/Modal'
import DataGroup from '@/components/atoms/DataGroup'
import SensorDetailsRow from '@/modules/sensors/components/SensorDetailsRow'
import { computed } from 'vue'

export default {
  name: 'FieldDetailsModal',
  components: {
    Modal,
    DataGroup,
    SensorDetailsRow
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
    const sensors = computed(_ => {
      return props.field.sensors
    })
    const details = computed(_ => [
      {
        label: 'Name',
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
      sensors,
      details
    }
  }
}
</script>

<style lang="scss" scoped>
.field-details-modal {
  ::v-deep .o-modal__content {
    width: 750px;
    padding: 20px;
  }
  &__grid {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  &__sensor {
    margin-bottom: 10px;
  }
}
</style>
