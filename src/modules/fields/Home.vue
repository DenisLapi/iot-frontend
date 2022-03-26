<template>
  <div>
    {{ switchVal }}
    <Switch v-model="switchVal" />
    <fields-map @fieldClicked="fieldClicked" />
  </div>
</template>

<script>
import { ref } from 'vue'
import FieldsMap from './components/FieldsMap'
import Switch from '@/components/atoms/Switch'

export default {
  name: 'Home',
  components: {
    FieldsMap,
    Switch
  },
  setup () {
    const field = ref({})
    const switchVal = ref(false)

    /**
     * Callback function triggered when field on the map is clicked
     * @param fieldData return field data
     */
    const fieldClicked = fieldData => {
      field.value = fieldData
    }

    return {
      field,
      switchVal,
      fieldClicked
    }
  }
}
</script>
