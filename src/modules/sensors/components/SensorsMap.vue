<template>
  <Map
    container="map"
    class="map"
    :access-token="accessToken"
    :center="center"
    :zoom="mapZoom"
    @load="onMapLoaded"
  />
</template>

<script>
import { computed, ref, watch } from 'vue'
import { addSensors, removeAllSensors } from '../utils'
import Map from '@/components/atoms/Map'

export default {
  name: 'SensorsMap',
  components: {
    Map
  },
  props: {
    sensors: {
      type: Array,
      default: () => []
    },
    center: {
      type: Array,
      default: () => [22.630162, 44.416341]
    }
  },
  setup (props, { emit }) {
    let mapCreated
    let mapSensorMarkers = []

    const mapZoom = ref(15)
    const sensors = computed(() => props.sensors)
    const accessToken = computed(() => process.env.VUE_APP_MAPBOX_ACCESS_TOKEN)

    /**
     * Function which adds sensors on map
     */
    const createSensorsOnMap = () => {
      removeAllSensors(mapSensorMarkers)
      addSensors(mapCreated, sensors.value,
        sensorMarkers => {
          mapSensorMarkers = sensorMarkers
        },
        id => {
          emit('onSensorClick', id)
        })
    }

    /**
     * Function triggered when mapbox map is loaded
     * @param map
     */
    const onMapLoaded = map => {
      mapCreated = map
      createSensorsOnMap()
    }

    watch(() => sensors.value, value => {
      createSensorsOnMap()
    })

    watch(() => props.center, value => {
      mapCreated.flyTo({
        center: value
      })
    })

    return {
      accessToken,
      mapZoom,
      onMapLoaded
    }
  }
}
</script>

<style lang="scss">
.sensor-marker {
  height: 45px;
  width: 45px;
  border-radius: 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background: #e8edea;
  border: 2px solid #000000;
  &:hover {
    background: #d4fbe3;
  }
}
</style>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
