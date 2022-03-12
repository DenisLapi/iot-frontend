<template>
  <fields-map @fieldClicked="fieldClicked" />
</template>

<script>
import FieldsMap from './components/FieldsMap'

export default {
  name: 'Home',
  components: {
    FieldsMap
  },
  setup () {
    const fieldClicked = field => {
      console.log(field)
    }
    return {
      fieldClicked
    }
  }
}
</script>
