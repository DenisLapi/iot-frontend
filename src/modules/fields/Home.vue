<template>
  <div>
    <fields-map @fieldClicked="fieldClicked" />
    <field-details-modal
      :field="field"
      :is-visible="showFieldDetailsModal"
      @onClose="closeFieldDetailsModal"
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
    const showFieldDetailsModal = ref(false)

    /**
     * Function triggered when close event on field details modal is emitted
     */
    const closeFieldDetailsModal = () => {
      showFieldDetailsModal.value = false
    }

    /**
     * Callback function triggered when field on the map is clicked
     * @param fieldData return field data
     */
    const fieldClicked = fieldData => {
      console.log(fieldData)
      field.value = fieldData
      showFieldDetailsModal.value = true
    }

    return {
      field,
      showFieldDetailsModal,
      fieldClicked,
      closeFieldDetailsModal
    }
  }
}
</script>
