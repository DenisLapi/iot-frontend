<template>
  <div class="sensor-card">
    <div class="sensor-card__icon-wrapper">{{ sensorIcon }}</div>
    <p class="sensor-card__name">{{ sensorRef.name }}</p>
    <p class="sensor-card__value">
      {{ lastValue }}<span class="sensor-card__value-unit">{{ sensorRef.unit }}</span>
    </p>
    <Switch
      class="sensor-card__status-switch"
      v-model="sensorRef.status"
      :small="true"
      @change="onChange"
    />
    <MenuGroup
      class="sensor-card__menu"
      :options="options" />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { sensorIcon as SENSOR_ICON } from '../utils'
import Switch from '@/components/atoms/Switch'
import MenuGroup from '@/components/molecules/MenuGroup'

export default {
  name: 'SensorCard',
  components: {
    Switch,
    MenuGroup
  },
  props: {
    sensor: {
      type: Object,
      required: true
    }
  },
  setup (props, { emit }) {
    const sensorIcon = computed(() => SENSOR_ICON[sensorRef.value.type])
    const sensorRef = computed(() => props.sensor)
    const lastValue = computed(() => {
      const values = sensorRef.value.values
      return values && values.length ? values[values.length - 1].value : 'N/A'
    })
    const options = ref([
      {
        label: 'Location',
        icon: 'crosshair',
        callback: () => {
          const { coordinates: { x, y } } = sensorRef.value
          emit('onSetLocation', { x, y })
        }
      },
      {
        label: props.sensor.battery ? `${props.sensor.battery}%` : 'N/A',
        icon: 'battery',
        callback: false
      }
    ])

    /**
     * Function emit event when change detected
     */
    const onChange = () => {
      emit('onChange', { ...sensorRef.value })
    }

    return {
      sensorIcon,
      sensorRef,
      lastValue,
      options,
      onChange
    }
  }
}
</script>

<style lang="scss" scoped>
.sensor-card {
  width: auto;
  height: auto;
  padding: 10px;
  border: 1px solid #dedede;
  position: relative;
  &__status-switch {
    position: absolute;
    top: 10px;
    right: 10px
  }
  &__icon-wrapper {
    width: 50px;
    height: 50px;
    border: 1px solid #dedede;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    font-size: 18px;
  }
  &__name {
    font-size: 13px;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 0;
  }
  &__value {
    font-size: 35px;
    text-align: center;
    margin: 0;
  }
  &__value-unit {
    font-size: 12px;
    color: #a5b2bc;
    padding-left: 2px;
  }
  &__menu {
    margin-top: 10px;
  }
}
</style>
