<template>
  <div class="sensor-card">
    <div class="sensor-card__icon-wrapper">
      <icon :name="sensor.type" />
    </div>
    <p class="sensor-card__name">{{ sensor.name }}</p>
    <p class="sensor-card__value">
      {{ sensor.current.value }}<span class="sensor-card__value-unit">{{ sensor.current.unit }}</span>
    </p>
    <Switch
      class="sensor-card__status-switch"
      :value="sensor.status"
      :small="true"
    />
    <MenuGroup
      class="sensor-card__menu"
      :options="options" />
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon'
import Switch from '@/components/atoms/Switch'
import MenuGroup from '@/components/molecules/MenuGroup'
import { ref } from 'vue'

export default {
  name: 'SensorCard',
  components: {
    Switch,
    Icon,
    MenuGroup
  },
  props: {
    sensor: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const options = ref([
      {
        label: 'Location',
        icon: 'crosshair',
        callback: () => { console.log('show location') }
      },
      {
        label: `${props.sensor.battery}%`,
        icon: 'battery',
        callback: false
      }
    ])
    return { options }
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
