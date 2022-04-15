<template>
  <div>
    <fields-map
      :fields="fields"
      @field-clicked="fieldClicked"
    />
    <field-details-modal
      :if="shouldDisplayFieldModal"
      :field="selectedField"
      :is-visible="showFieldModal"
      @on-close="closeFieldModal"
      @on-change="updateField"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useFieldStore } from './store'
import FieldsMap from './components/FieldsMap'
import FieldDetailsModal from './components/FieldDetailsModal'

export default {
  name: 'Home',
  components: {
    FieldsMap,
    FieldDetailsModal
  },
  setup () {
    const fieldStore = useFieldStore()
    const { fields } = storeToRefs(fieldStore)
    const selectedField = ref({})
    const showFieldModal = ref(false)
    const shouldDisplayFieldModal = computed(() => !!selectedField.value && showFieldModal.value)

    /**
     * Callback function triggered when field on the map is clicked
     * @param fieldId
     */
    const fieldClicked = fieldId => {
      selectedField.value = fieldStore.getField(fieldId)
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
      fieldStore.updateField(field)
    }

    onMounted(_ => {
      fieldStore.loadFields()
    })

    return {
      fields,
      selectedField,
      showFieldModal,
      shouldDisplayFieldModal,
      fieldClicked,
      closeFieldModal,
      updateField
    }
  }
}
</script>
