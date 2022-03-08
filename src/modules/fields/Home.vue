<template>
  <Map
    container="map"
    class="map"
    :style="'mapbox://styles/mapbox/outdoors-v11'"
    :access-token="accessToken"
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
      createFields(fields, map, 'maine')
      /*
      map.addSource('maine', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-67.13734, 45.13745],
                [-66.96466, 44.8097],
                [-68.03252, 44.3252],
                [-69.06, 43.98],
                [-70.11617, 43.68405],
                [-70.64573, 43.09008],
                [-70.75102, 43.08003],
                [-70.79761, 43.21973],
                [-70.98176, 43.36789],
                [-70.94416, 43.46633],
                [-71.08482, 45.30524],
                [-70.66002, 45.46022],
                [-70.30495, 45.91479],
                [-70.00014, 46.69317],
                [-69.23708, 47.44777],
                [-68.90478, 47.18479],
                [-68.2343, 47.35462],
                [-67.79035, 47.06624],
                [-67.79141, 45.70258],
                [-67.13734, 45.13745]
              ]
            ]
          }
        }
      })

      map.addLayer({
        id: 'maine',
        type: 'fill',
        source: 'maine', // reference the data source
        layout: {},
        paint: {
          'fill-color': '#0080ff', // blue color fill
          'fill-opacity': 0.5
        }
      })

      map.addLayer({
        id: 'outline',
        type: 'line',
        source: 'maine',
        layout: {},
        paint: {
          'line-color': '#000',
          'line-width': 3
        }
      })
      */
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
