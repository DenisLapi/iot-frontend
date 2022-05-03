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
import { computed, onMounted, ref } from 'vue'
import { addSensors } from '../utils'
import { useSensorStore } from '../store'
import Map from '@/components/atoms/Map'

export default {
  name: 'SensorsMap',
  components: {
    Map
  },
  setup () {
    const sensorStore = useSensorStore()
    const accessToken = computed(() => process.env.VUE_APP_MAPBOX_ACCESS_TOKEN)
    const mapCenter = ref([22.630162, 44.416341])
    const mapZoom = ref(15)
    const sensors = ref([])
    const onMapLoaded = map => {
      addSensors(map, sensors.value, id => {
        console.log(id)
      })
    }
    onMounted(async _ => {
      sensors.value = await sensorStore.getSensors()
    })
    return {
      accessToken,
      mapCenter,
      mapZoom,
      onMapLoaded
    }
  }
}
</script>

<style>
.sensor-marker {
  height: 45px;
  width: 45px;
  border-radius: 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background: #e8edea;
  border: 1px solid #000000;
}
</style>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
