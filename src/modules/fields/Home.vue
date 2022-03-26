<template>
  <div>
    <fields-map @fieldClicked="fieldClicked" />
  </div>
</template>

<script>
import { ref } from 'vue'
import FieldsMap from './components/FieldsMap'

export default {
  name: 'Home',
  components: {
    FieldsMap
  },
  setup () {
    const field = ref({})

    /**
     * Callback function triggered when field on the map is clicked
     * @param fieldData return field data
     */
    const fieldClicked = fieldData => {
      field.value = fieldData
    }

    return {
      field,
      fieldClicked
    }
  }
}
</script>
