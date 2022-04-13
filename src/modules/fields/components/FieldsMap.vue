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
import { computed, ref, watch } from 'vue'
import { createFields, updateFields } from '../utils/fields'
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
    let map
    const mapCenter = ref([22.630162, 44.416341])
    const mapZoom = ref(15)
    const accessToken = computed(() => process.env.VUE_APP_MAPBOX_ACCESS_TOKEN)

    /**
     * Callback function triggered when field is clicked
     * @param fieldId callback returns field id
     */
    const fieldClicked = fieldId => emit('fieldClicked', fieldId)
    const onMapLoaded = createdMap => {
      map = createdMap
      createFields(
        props.fields,
        map,
        'fields-map',
        'fields-layer',
        fieldClicked)
    }

    watch(props.fields, _ => {
      updateFields(
        props.fields,
        map,
        'fields-map')
    })
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
