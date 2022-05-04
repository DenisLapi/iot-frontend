<template>
  <modal
    class="sensor-details"
    :is-visible="show"
    :max-width="1500"
    @on-close="closeModal"
  >
    <Input
        v-model="sensorRef.name"
        placeholder="Enter sensor name"
        label="Sensor name"
      />
    <Select
      v-model="sensorRef.type"
      class="mt-20"
      label="Sensor type"
      :options="sensorsSelectOptions"
    />
    <Switch
      v-model="sensorRef.status"
      class="status-switch mt-20"
      label="Activated"
      :small="true"
    />
    <div class="footer mt-20">
      <Button
        type="small primary"
        class="mr-15"
        @click="saveSensor"
      >
        Save
      </Button>
      <Button
        type="small"
        @click="closeModal"
      >
        Close
      </Button>
    </div>
  </modal>
</template>

<script>
import { computed, ref } from 'vue'
import { SENSOR_SELECT_OPTIONS, SENSOR_EMPTY_SCHEMA } from '../utils'
import Modal from '@/components/molecules/Modal'
import Switch from '@/components/atoms/Switch'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

export default {
  name: 'SensorCreateModal',
  components: {
    Button,
    Select,
    Switch,
    Modal,
    Input
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const sensorsSelectOptions = ref(SENSOR_SELECT_OPTIONS)
    const sensorRef = ref({ ...SENSOR_EMPTY_SCHEMA })
    const show = computed({
      get () {
        return props.isVisible
      },
      set (value) {
        emit('onClose', value)
      }
    })

    /**
     * Function emits event to save the sensor
     */
    const saveSensor = () => {
      emit('onSave', { ...sensorRef.value })
    }

    /**
     * Function triggered by framework when modal is closed
     * @param value
     */
    const closeModal = value => emit('onClose', value)

    return {
      sensorsSelectOptions,
      sensorRef,
      show,
      saveSensor,
      closeModal
    }
  }
}
</script>

<style lang="scss" scoped>
.sensor-details {
  ::v-deep .o-modal__content {
    width: 1500px;
  }
  .switch-wrapper {
    display: flex;
    justify-content: flex-end;
    ::v-deep .o-switch {
      margin-right: -8px;
    }
  }
  .header {
    display: grid;
    grid-template-columns: 70% auto;
    column-gap: 10px;
  }
  .title {
    margin: 0;
  }
  .current-value {
    font-size: 45px;
    line-height: 45px;
    text-align: right;
    margin: 0;
    .unit {
      font-size: 15px;
      color: #a5b2bc;
      padding-left: 2px;
    }
  }
  .battery {
    font-size: 15px;
    font-weight: 500;
    display: flex;
    align-items: center;
    margin: 20px 0 0;
    svg {
      margin-right: 8px;
    }
  }
  .footer {
    display: flex;
    & > :first-child {
      margin-left: auto;
    }
  }
}
.mr-15 {
  margin-right: 15px;
}
.mt-10 {
  margin-top: 10px;
}
.mt-20 {
  margin-top: 20px;
}
</style>
