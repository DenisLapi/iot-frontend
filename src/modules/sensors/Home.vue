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
      @on-save="saveSensor"
      @on-close="closeSensorDetailsModal"
    />
    <sensor-create-modal
      :is-visible="showCreateSensorModal"
      @on-close="closeCreateSensorModal"
      @on-save="addSensor"
    />
  </div>
</template>

<script>
import { useSensorStore } from './store'
import { onMounted, ref } from 'vue'
import SensorsMap from './components/SensorsMap'
import SensorsSidebar from './components/SensorsSidebar'
import SensorDetailsModal from '@/modules/sensors/components/SensorDetailsModal'
import SensorCreateModal from '@/modules/sensors/components/SensorCreateModal'

export default {
  name: 'Home',
  components: {
    SensorCreateModal,
    SensorDetailsModal,
    SensorsMap,
    SensorsSidebar
  },
  setup () {
    const sensorStore = useSensorStore()
    const sensors = ref([])
    const mapCenter = ref([22.630162, 44.416341])
    const showSensorDetailsModal = ref(false)
    const showCreateSensorModal = ref(true)
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

    /**
     * Function triggered when save event is emitted
     * @param sensor
     */
    const saveSensor = async sensor => {
      await sensorStore.saveSensor(sensor)
      showSensorDetailsModal.value = false
    }

    /**
     * Function triggered when close event is emitted on create sensor modal
     * @param _
     */
    const closeCreateSensorModal = _ => {
      showCreateSensorModal.value = false
    }

    /**
     * Function triggered when save event is emitted on create sensor modal
     * @param sensor
     */
    const addSensor = async sensor => {
      await sensorStore.addSensor(sensor)
    }

    onMounted(async _ => {
      sensors.value = await sensorStore.getSensors()
      selectedSensor.value = sensors.value[0]
    })

    return {
      sensors,
      mapCenter,
      showSensorDetailsModal,
      showCreateSensorModal,
      selectedSensor,
      onSensorClicked,
      closeSensorDetailsModal,
      setLocation,
      saveSensor,
      closeCreateSensorModal,
      addSensor
    }
  }
}
</script>

<style scoped>
.sensors-page {
  display: flex;
}
</style>
