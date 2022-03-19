<template>
  <div>
    <fields-map @fieldClicked="fieldClicked" />
    <field-details-modal
      :is-visible="showFieldDetailsModal"
      @close="showFieldDetailsModal = false"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import FieldsMap from './components/FieldsMap'
import FieldDetailsModal from './components/FieldDetailsModal'

export default {
  name: 'Home',
  components: {
    FieldsMap,
    FieldDetailsModal
  },
  setup () {
    const showFieldDetailsModal = ref(true)
    const fieldClicked = field => console.log(field)
    return {
      showFieldDetailsModal,
      fieldClicked
    }
  }
}
</script>
