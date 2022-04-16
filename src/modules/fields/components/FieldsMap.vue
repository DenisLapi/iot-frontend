<template>
  <div>
    <button @click="setCreateMode()">Create</button>
    <button @click="setSelectMode()">Select</button>
    Mode: {{ mapMode }}
    <Map
      container="map"
      class="map"
      :access-token="accessToken"
      :center="mapCenter"
      :zoom="mapZoom"
      :mode="mapMode"
      @load="mapLoaded"
    />
  </div>
</template>

<script>
import {
  computed,
  ref,
  watch
} from 'vue'
import {
  MAP_MODE_CREATE,
  MAP_MODE_SELECT,
  createFields,
  updateFields
} from '../utils/fields'
import Map from '@/components/atoms/Map'

export default {
  name: 'FieldsMap',
  components: {
    Map
  },
  props: {
    fields: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  setup (props, { emit }) {
    const map = ref(null)
    const mapMode = ref(MAP_MODE_SELECT)
    const mapCenter = ref([22.630162, 44.416341])
    const mapZoom = ref(15)
    const accessToken = computed(() => process.env.VUE_APP_MAPBOX_ACCESS_TOKEN)

    /**
     * Function triggered when map is loaded
     * @param createdMap Map created by the mapbox
     */
    const mapLoaded = createdMap => {
      map.value = createdMap
      createFields(props.fields, map.value)
      setMapClickEvents(mapMode.value)
    }

    /**
     * Function selects create mode for map
     */
    const setCreateMode = () => {
      mapMode.value = MAP_MODE_CREATE
    }

    /**
     * Function selects select mode for map
     */
    const setSelectMode = () => {
      mapMode.value = MAP_MODE_SELECT
    }

    /**
     * Function handles click on the field
     * @param e
     */
    const handleFieldClick = e => {
      emit('fieldClicked', e.features[0].properties.id)
    }

    /**
     * Function handles click on the map
     * @param e
     */
    const handleMapClick = e => {
      console.log('handle map click', e)
    }

    /**
     * Function sets event listeners for the map
     */
    const setMapClickEvents = (mode) => {
      switch (mode) {
        case MAP_MODE_CREATE:
          map.value.off('click', 'fields-layer', handleFieldClick)
          map.value.on('click', handleMapClick)
          break
        default:
          map.value.off('click', handleMapClick)
          map.value.on('click', 'fields-layer', handleFieldClick)
      }
    }

    watch(() => props.fields, _ => {
      if (map.value) {
        updateFields(
          props.fields,
          map.value,
          'fields-map')
      }
    }, { deep: true })
    watch(mapMode, mode => {
      setMapClickEvents(mode)
    })

    return {
      mapMode,
      mapCenter,
      mapZoom,
      accessToken,
      mapLoaded,
      setCreateMode,
      setSelectMode
    }
  }
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 100vh;
}
</style>
