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
    <sensor-details-modal
      :sensor="selectedSensor"
      :is-visible="showSensorDetailsModal"
      @on-close="closeSensorDetailsModal"
    />
  </div>
</template>

<script>
import { useSensorStore } from './store'
import { onMounted, ref } from 'vue'
import SensorsMap from './components/SensorsMap'
import SensorsSidebar from './components/SensorsSidebar'
import SensorDetailsModal from '@/modules/sensors/components/SensorDetailsModal'

export default {
  name: 'Home',
  components: {
    SensorDetailsModal,
    SensorsMap,
    SensorsSidebar
  },
  setup () {
    const sensorStore = useSensorStore()
    const sensors = ref([])
    const mapCenter = ref([22.630162, 44.416341])
    const showSensorDetailsModal = ref(false)
    const selectedSensor = ref({})

    /**
     * Function triggered on sensor on the map is clicked
     * @param id
     */
    const onSensorClicked = id => {
      showSensorDetailsModal.value = true
    }

    /**
     * Function triggered when sensor details modal close event is emitted
     */
    const closeSensorDetailsModal = () => {
      showSensorDetailsModal.value = false
    }

    /**
     * Function triggered when set location in the sensor card is clicked
     * @param x
     * @param y
     */
    const setLocation = ({ x, y }) => {
      mapCenter.value = [x, y]
    }

    onMounted(async _ => {
      sensors.value = await sensorStore.getSensors()
      selectedSensor.value = sensors.value[0]
    })

    return {
      sensors,
      mapCenter,
      showSensorDetailsModal,
      selectedSensor,
      onSensorClicked,
      closeSensorDetailsModal,
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
