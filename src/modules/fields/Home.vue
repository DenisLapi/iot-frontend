<template>
  <Map
    container="map"
    class="map"
    :access-token="accessToken"
  />
</template>

<script>
import Map from '@/components/atoms/Map'
import { computed } from 'vue'

export default {
  name: 'Home',
  components: {
    Map
  },
  setup () {
    const accessToken = computed(_ => {
      return process.env.VUE_APP_MAPBOX_ACCESS_TOKEN
    })
    return {
      accessToken
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
