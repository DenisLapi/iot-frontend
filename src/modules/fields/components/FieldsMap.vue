<template>
  <Map
    container="map"
    class="map"
    :access-token="accessToken"
    :center="mapCenter"
    :zoom="mapZoom"
    @load="onMapLoaded"
  />
</template>

<script>
import { computed, ref } from 'vue'
import { createFields } from '../utils/fields'
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
    const mapCenter = ref([22.630162, 44.416341])
    const mapZoom = ref(15)
    const accessToken = computed(_ => {
      return process.env.VUE_APP_MAPBOX_ACCESS_TOKEN
    })

    /**
     * Callback function triggered when field is clicked
     * @param field return clicked field
     */
    const fieldClicked = field => emit('fieldClicked', field)
    const onMapLoaded = map => {
      createFields(
        props.fields,
        map,
        'fields-map',
        'fields-layer',
        fieldClicked)
    }
    return {
      mapCenter,
      mapZoom,
      accessToken,
      onMapLoaded
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
