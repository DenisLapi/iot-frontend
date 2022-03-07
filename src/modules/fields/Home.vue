<template>
  <Map
    container="map"
    class="map"
    :access-token="accessToken"
  />
</template>

<script>
import Map from '@/components/molecules/Map'

export default {
  name: 'Home',
  components: {
    Map
  },
  computed: {
    accessToken () {
      return process.env.VUE_APP_MAPBOX_ACCESS_TOKEN
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
