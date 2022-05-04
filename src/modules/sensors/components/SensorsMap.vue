<template>
  <div class="sensors-map">
    <map-controls
      class="map-controls"
      :options="mapControlOptions"
    />
    <Map
      container="map"
      class="map"
      :access-token="accessToken"
      :center="center"
      :zoom="mapZoom"
      @load="onMapLoaded"
    />
  </div>
</template>

<script>
import { isEmpty } from 'lodash'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { addSensors, removeAllSensors } from '../utils'
import { MAP_MODE_CREATE, MAP_MODE_SELECT } from '@/modules/fields/utils/fields'
import Map from '@/components/atoms/Map'
import MapControls from '@/modules/fields/components/MapControls'

export default {
  name: 'SensorsMap',
  components: {
    MapControls,
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

    const router = useRouter()
    const newSensorCoords = ref({})
    const mapZoom = ref(15)
    const mapMode = ref(MAP_MODE_SELECT)
    const sensors = computed(() => props.sensors)
    const accessToken = computed(() => process.env.VUE_APP_MAPBOX_ACCESS_TOKEN)
    const showSaveButton = computed(() => mapMode.value === MAP_MODE_CREATE && !isEmpty(newSensorCoords.value))
    const mapControlOptions = computed(() => [
      {
        icon: 'select',
        hide: false,
        callback: () => {
          mapMode.value = MAP_MODE_SELECT
          newSensorCoords.value = {}
        }
      },
      {
        icon: 'save',
        hide: !showSaveButton.value,
        callback: () => {
          mapMode.value = MAP_MODE_SELECT
          emit('onSaveCoords', newSensorCoords.value)
        }
      },
      {
        icon: 'cpu',
        hide: mapMode.value === MAP_MODE_CREATE,
        callback: () => {
          mapMode.value = MAP_MODE_CREATE
        }
      },
      {
        icon: 'layout',
        hide: false,
        callback: () => { router.push('/fields') }
      }
    ])

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
          if (mapMode.value === MAP_MODE_SELECT) {
            emit('onSensorClick', id)
          }
        })
    }

    /**
     * Function triggered when mapbox map is loaded
     * @param map
     */
    const onMapLoaded = map => {
      mapCreated = map
      createSensorsOnMap()
      mapCreated.on('click', ({ lngLat: { lat, lng } }) => {
        if (mapMode.value === MAP_MODE_CREATE) {
          newSensorCoords.value = {
            x: lng,
            y: lat
          }
        }
      })
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
      mapControlOptions,
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
.sensors-map {
  position: relative;
  width: 100%;
  height: 100vh;
  .map-controls {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
}
.map {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
