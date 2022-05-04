<template>
  <div class="sensors-page">
    <sensors-map
      :sensors="sensors"
      :center="mapCenter"
      @on-sensor-click="onSensorClicked"
    />
    <sensors-sidebar
      :sensors="sensors"
      @on-set-location="setLocation"
    />
  </div>
</template>

<script>
import { useSensorStore } from './store'
import { onMounted, ref } from 'vue'
import SensorsMap from './components/SensorsMap'
import SensorsSidebar from './components/SensorsSidebar'

export default {
  name: 'Home',
  components: {
    SensorsMap,
    SensorsSidebar
  },
  setup () {
    const sensorStore = useSensorStore()
    const sensors = ref([])
    const mapCenter = ref([22.630162, 44.416341])

    /**
     * Function triggered on sensor on the map is clicked
     * @param id
     */
    const onSensorClicked = id => console.log(id)

    /**
     * Function triggered when set location in the sensor card is clicked
     * @param x
     * @param y
     */
    const setLocation = ({ x, y }) => {
      console.log(x, y)
      mapCenter.value = [x, y]
    }

    onMounted(async _ => {
      sensors.value = await sensorStore.getSensors()
    })

    return {
      sensors,
      mapCenter,
      onSensorClicked,
      setLocation
    }
  }
}
</script>

<style scoped>
.sensors-page {
  display: flex;
}
</style>
