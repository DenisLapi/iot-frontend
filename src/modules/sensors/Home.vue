<template>
  <div class="sensors-page">
    <sensors-map
      :sensors="sensors"
      :center="mapCenter"
      @on-sensor-click="onSensorClicked"
      @on-save-coords="saveCoordinates"
    />
    <sensors-sidebar
      :sensors="sensors"
      @on-set-location="setLocation"
      @on-change="onSensorChange"
    />
    <sensor-details-modal
      :sensor="selectedSensor"
      :is-visible="showSensorDetailsModal"
      @on-save="saveSensor"
      @on-close="closeSensorDetailsModal"
      @on-delete="deleteSensor"
    />
    <sensor-create-modal
      :is-visible="showCreateSensorModal"
      @on-close="closeCreateSensorModal"
      @on-save="addSensor"
    />
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useSensorStore } from './store'
import { onMounted, ref } from 'vue'
import SensorsMap from './components/SensorsMap'
import SensorsSidebar from './components/SensorsSidebar'
import SensorDetailsModal from './components/SensorDetailsModal'
import SensorCreateModal from './components/SensorCreateModal'

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
    const { sensors } = storeToRefs(sensorStore)
    const newSensorCoords = ref({})
    const mapCenter = ref([22.630162, 44.416341])
    const showSensorDetailsModal = ref(false)
    const showCreateSensorModal = ref(false)
    const selectedSensor = ref({})

    /**
     * Function triggered on sensor on the map is clicked
     * @param id
     */
    const onSensorClicked = async id => {
      selectedSensor.value = await sensorStore.getSensor(id)
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
      await sensorStore.updateSensor(sensor)
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
      sensor.coordinates = newSensorCoords.value
      await sensorStore.addSensor(sensor)
      newSensorCoords.value = {}
      showCreateSensorModal.value = false
    }

    const saveCoordinates = coords => {
      newSensorCoords.value = coords
      showCreateSensorModal.value = true
    }

    /**
     * Function triggered when delete event is emitted
     * @param id
     */
    const deleteSensor = async ({ id }) => {
      showSensorDetailsModal.value = false
      await sensorStore.deleteSensor({ id })
      selectedSensor.value = {}
    }

    const onSensorChange = async sensor => {
      await sensorStore.updateSensor(sensor)
    }

    onMounted(async _ => {
      sensorStore.triggerLiveUpdates()
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
      addSensor,
      saveCoordinates,
      deleteSensor,
      onSensorChange
    }
  }
}
</script>

<style scoped>
.sensors-page {
  display: flex;
}
</style>
