<template>
  <modal
    class="sensor-details"
    :is-visible="show"
    :max-width="1300"
    @on-close="closeModal"
  >
    <div class="switch-wrapper">
      <Switch
        class="status-switch"
        v-model="sensorRef.status"
        :small="true"
      />
    </div>
    <div class="header mt-10">
      <div>
        <h2 class="title">{{ sensorRef.name }}</h2>
        <p class="battery">
          <icon
            name="battery"
            :color="batteryColor"
            :size="18"
          />
          {{ sensorRef.battery }}%
        </p>
      </div>
      <div>
        <p class="current-value">
          {{ sensorRef.current.value }}
          <span class="unit">{{ sensorRef.current.unit }}</span>
        </p>
      </div>
    </div>
    <div>
      <Select
        v-model="sensorRef.type"
        class="mt-20"
        label="Sensor type"
        :options="sensorsSelectOptions"
      />
    </div>
    <token
      class="mt-20"
      label="Sensor ID"
      :token="sensor.id"
    />
  </modal>
</template>

<script>
import { computed, ref } from 'vue'
import { SENSOR_SELECT_OPTIONS } from '../utils'
import Token from '@/components/molecules/Token'
import Modal from '@/components/molecules/Modal'
import Switch from '@/components/atoms/Switch'
import Icon from '@/components/atoms/Icon'
import Select from '@/components/atoms/Select'

export default {
  name: 'SensorDetailsModal',
  components: {
    Select,
    Icon,
    Switch,
    Token,
    Modal
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    sensor: {
      type: Object,
      required: true
    }
  },
  setup (props, { emit }) {
    const sensorsSelectOptions = ref(SENSOR_SELECT_OPTIONS)
    const sensorRef = computed(() => props.sensor)
    const show = computed({
      get () {
        return props.isVisible
      },
      set (value) {
        emit('onClose', value)
      }
    })
    const batteryColor = computed(() => {
      if (sensorRef.value.battery <= 20) {
        return '#fa1a1a'
      } else if (sensorRef.value.battery <= 50) {
        return '#f1be0d'
      } else {
        return '#27ad5f'
      }
    })

    /**
     * Function triggered by framework when modal is closed
     * @param value
     */
    const closeModal = value => emit('onClose', value)

    return {
      sensorsSelectOptions,
      sensorRef,
      show,
      batteryColor,
      closeModal
    }
  }
}
</script>

<style lang="scss" scoped>
.sensor-details {
  ::v-deep .o-modal__content {
    width: 600px;
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
    margin: 5px 0;
    svg {
      margin-right: 8px;
    }
  }
}
.mt-10 {
  margin-top: 10px;
}
.mt-20 {
  margin-top: 20px;
}
</style>
