<template>
  <div :id="container"/>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import { onMounted } from 'vue'

export default {
  props: {
    accessToken: {
      type: String,
      required: true
    },
    container: {
      type: String,
      required: true
    },
    style: {
      type: String,
      required: false,
      default: 'mapbox://styles/mapbox/satellite-v9'
    },
    center: {
      type: Array,
      default: () => [-74.5, 40]
    },
    zoom: {
      type: Number,
      required: false,
      default: 5
    }
  },
  setup (props, { emit }) {
    onMounted(_ => {
      const {
        accessToken,
        container,
        style,
        center,
        zoom
      } = props
      mapboxgl.accessToken = accessToken
      const map = new mapboxgl.Map({
        container,
        style,
        center,
        zoom
      })
      map.on('load', () => {
        emit('load', map)
      })
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~mapbox-gl/dist/mapbox-gl.css";

::v-deep .mapbox-gl-draw_polygon {
  background: url("~@/assets/icons/polygon.svg") no-repeat center;
}

::v-deep .mapbox-gl-draw_trash {
  background: url("~@/assets/icons/trash.svg") no-repeat center;
}
</style>
