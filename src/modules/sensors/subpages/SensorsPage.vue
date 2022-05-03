<template>
  <div class="sensors-page">
    <sensors-map
      :sensors="sensors"
      @on-sensor-click="onSensorClicked"
    />
    <div class="sensors-page__sidebar">
      <div class="sensors-page__list">
        <div
          v-for="sensor in sensors"
          :key="sensor.id"
        >
          <sensor-card :sensor="sensor"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useSensorStore } from '../store'
import { onMounted, ref } from 'vue'
import SensorsMap from '../components/SensorsMap'
import SensorCard from '../components/SensorCard'

export default {
  name: 'SensorsPage',
  components: {
    SensorsMap,
    SensorCard
  },
  setup () {
    const sensorStore = useSensorStore()
    const sensors = ref([])
    const onSensorClicked = id => console.log(id)
    onMounted(async _ => {
      sensors.value = await sensorStore.getSensors()
    })
    return {
      sensors,
      onSensorClicked
    }
  }
}
</script>

<style lang="scss" scoped>
.sensors-page {
  display: flex;
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
