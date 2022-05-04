<template>
  <div class="sensors__sidebar">
    <div class="sensors__list">
      <div
        v-for="sensor in sensors"
        :key="sensor.id"
      >
        <sensor-card
          :sensor="sensor"
          @on-set-location="setLocation"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SensorCard from './SensorCard'

export default {
  name: 'SensorsSidebar',
  components: {
    SensorCard
  },
  props: {
    sensors: {
      type: Array,
      default: () => []
    }
  },
  setup (props, { emit }) {
    /**
     * Function triggered when set location is emitted from sensor card
     * @param x
     * @param y
     */
    const setLocation = ({ x, y }) => {
      emit('onSetLocation', { x, y })
    }
    return {
      setLocation
    }
  }
}
</script>

<style lang="scss" scoped>
.sensors {
  &__sidebar {
    width: 600px;
    height: 100vh;
    padding: 10px;
    overflow-y: auto;
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 10px;
  }
}
</style>
