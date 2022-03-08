<template>
  <Map
    container="map"
    class="map"
    :style="'mapbox://styles/mapbox/outdoors-v11'"
    :access-token="accessToken"
    :center="[22.630162, 44.416341]"
    :zoom="14"
    @load="mapLoaded"
  />
</template>

<script>
import Map from '@/components/atoms/Map'
import fields from './data'
import { computed } from 'vue'
import { createFields } from './utils/fields'

export default {
  name: 'Home',
  components: {
    Map
  },
  setup () {
    const accessToken = computed(_ => {
      return process.env.VUE_APP_MAPBOX_ACCESS_TOKEN
    })
    const mapLoaded = map => {
      createFields(fields, map, 'fields-map')
    }
    return {
      accessToken,
      mapLoaded
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
