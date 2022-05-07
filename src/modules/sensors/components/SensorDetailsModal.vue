<template>
  <modal
    class="sensor-details"
    :is-visible="show"
    :max-width="1500"
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
        <Input
          v-model="sensorRef.name"
          placeholder="Enter sensor name"
        />
        <p class="battery">
          <icon
            name="battery"
            :color="batteryColor"
            :size="23"
          />
          {{ sensorRef.battery }}%
        </p>
      </div>
      <div v-if="lastValue">
        <p class="current-value">
          {{ lastValue }}<span class="unit">{{ sensorRef.unit }}</span>
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
    <line-chart
      v-if="chartData"
      class="mt-20"
      :chart-data="chartData"
      :chart-options="chartOptions"
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
        type="small danger"
        class="mr-15"
        @click="deleteSensor"
      >
        Delete
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
import { SENSOR_SELECT_OPTIONS } from '../utils'
import Token from '@/components/molecules/Token'
import Modal from '@/components/molecules/Modal'
import Switch from '@/components/atoms/Switch'
import Icon from '@/components/atoms/Icon'
import Select from '@/components/atoms/Select'
import LineChart from '@/components/molecules/charts/LineChart'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

export default {
  name: 'SensorDetailsModal',
  components: {
    Button,
    LineChart,
    Select,
    Icon,
    Switch,
    Token,
    Modal,
    Input
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
    const lastValue = computed(() => {
      const values = sensorRef.value.values
      return values && values.length ? values[values.length - 1].value : ''
    })
    const chartData = computed(() => {
      if (sensorRef.value.values && sensorRef.value.values.length) {
        const labels = sensorRef.value.values.map(({ label }) => label)
        const data = sensorRef.value.values.map(({ value }) => value)
        return {
          labels,
          datasets: [
            {
              label: 'Value',
              backgroundColor: '#38da6b',
              data
            }
          ]
        }
      }
      return null
    })
    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: false
      },
      scales: {
        x: {
          display: false
        }
      }
    })

    /**
     * Function emits event to save the sensor
     */
    const saveSensor = () => {
      emit('onSave', { ...sensorRef.value })
    }

    /**
     * Function emits event to delete the sensor
     */
    const deleteSensor = () => {
      emit('onDelete', { ...sensorRef.value })
      closeModal()
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
      batteryColor,
      lastValue,
      chartData,
      chartOptions,
      saveSensor,
      deleteSensor,
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
