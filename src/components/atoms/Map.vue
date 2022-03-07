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
      default: 'mapbox://styles/mapbox/streets-v11'
    },
    center: {
      type: Array,
      required: false,
      default: () => [-74.5, 40]
    },
    zoom: {
      type: Number,
      required: false,
      default: 9
    }
  },
  setup (props, { emit }) {
    onMounted(_ => {
      const { accessToken, container, style, center, zoom } = props
      mapboxgl.accessToken = accessToken
      const map = new mapboxgl.Map({
        container,
        style,
        center,
        zoom
      })
      map.on('load', map => emit('load', map))
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~mapbox-gl/dist/mapbox-gl.css";
</style>
