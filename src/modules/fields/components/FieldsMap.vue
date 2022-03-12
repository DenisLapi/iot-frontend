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
import Map from '@/components/atoms/Map'
import fields from '../data'
import { computed, ref } from 'vue'
import { createFields } from '../utils/fields'

export default {
  name: 'FieldsMap',
  components: {
    Map
  },
  setup (props, { emit }) {
    const accessToken = computed(_ => {
      return process.env.VUE_APP_MAPBOX_ACCESS_TOKEN
    })
    const mapCenter = ref([22.630162, 44.416341])
    const mapZoom = ref(15)
    const fieldClicked = field => { emit('fieldClicked', field) }
    const onMapLoaded = map => {
      createFields(
        fields,
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
