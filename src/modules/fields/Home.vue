<template>
  <div>
    <fields-map @field-clicked="fieldClicked" />
    <field-details-modal
      :if="!!field && showFieldModal"
      :field="field"
      :is-visible="showFieldModal"
      @close="closeFieldModal"
      @change="updateField"
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
    const field = ref({})
    const showFieldModal = ref(false)

    /**
     * Callback function triggered when field on the map is clicked
     * @param fieldData return field data
     */
    const fieldClicked = fieldData => {
      field.value = fieldData
      showFieldModal.value = true
    }

    const closeFieldModal = () => {
      showFieldModal.value = false
    }

    /**
     * Function is triggered when field value is changed
     * @param field
     */
    const updateField = field => {
      // console.log('update field', field)
    }

    return {
      field,
      showFieldModal,
      fieldClicked,
      closeFieldModal,
      updateField
    }
  }
}
</script>
