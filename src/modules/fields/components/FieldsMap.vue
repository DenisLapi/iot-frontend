<template>
  <div>
    <button
      v-if="showSaveButton"
      @click="saveCreatedField"
    >
      Save
    </button>
    <button
      v-if="showCreateButton"
      @click="setCreateMode()"
    >
      Create
    </button>
    <button @click="setSelectMode()">Select</button>
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
  updateFields,
  getMapboxDraw
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
    let map, draw

    const newField = ref(null)
    const mapMode = ref(MAP_MODE_SELECT)
    const mapCenter = ref([22.630162, 44.416341])
    const mapZoom = ref(15)

    const accessToken = computed(() => process.env.VUE_APP_MAPBOX_ACCESS_TOKEN)
    const showSaveButton = computed(() => newField.value?.features[0] && mapMode.value === MAP_MODE_CREATE)
    const showCreateButton = computed(() => !newField.value && mapMode.value === MAP_MODE_SELECT)

    /**
     * Function triggered when map is loaded
     * @param createdMap Map created by the mapbox
     */
    const mapLoaded = createdMap => {
      map = createdMap
      createFields(props.fields, map)
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

    const updateNewFieldAre = _ => {
      newField.value = draw.getAll()
    }

    const saveCreatedField = _ => {
      emit('saveCreatedField', newField.value.features[0])
    }

    /**
     * Function sets event listeners for the map
     */
    const setMapClickEvents = (mode) => {
      switch (mode) {
        case MAP_MODE_CREATE:
          draw = getMapboxDraw()
          map.addControl(draw)
          map.off('click', 'fields-layer', handleFieldClick)
          map.on('draw.create', updateNewFieldAre)
          map.on('draw.delete', updateNewFieldAre)
          map.on('draw.update', updateNewFieldAre)
          break
        default:
          if (draw) {
            map.removeControl(draw)
            newField.value = null
          }
          map.on('click', 'fields-layer', handleFieldClick)
      }
    }

    watch(() => props.fields, _ => {
      if (map) {
        updateFields(
          props.fields,
          map,
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
      showSaveButton,
      showCreateButton,
      mapLoaded,
      setCreateMode,
      setSelectMode,
      saveCreatedField
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
