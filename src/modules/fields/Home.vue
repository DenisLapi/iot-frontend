<template>
  <div>
    <fields-map
      :fields="fields"
      @field-clicked="fieldClicked"
      @save-created-field="saveCreatedField"
    />
    <field-details-modal
      :if="shouldDisplayFieldModal"
      :field="selectedField"
      :is-visible="showFieldModal"
      @on-close="closeFieldModal"
      @on-change="updateField"
    />
    <create-field-modal
      :is-visible="showCreateFieldModal"
      :crops="crops"
      @on-close="closeCreateFieldModal"
      @on-create="createField"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useFieldStore } from './store'
import { CROP_TYPES_LIST } from './utils/crops'
import { formatCoordinatesToObject } from './utils/fields'
import FieldsMap from './components/FieldsMap'
import FieldDetailsModal from './components/FieldDetailsModal'
import CreateFieldModal from './components/CreateFieldModal'

export default {
  name: 'Home',
  components: {
    FieldsMap,
    FieldDetailsModal,
    CreateFieldModal
  },
  setup () {
    let newFieldCoordinates = []
    const fieldStore = useFieldStore()
    const { fields } = storeToRefs(fieldStore)
    const selectedField = ref({})
    const showFieldModal = ref(false)
    const showCreateFieldModal = ref(false)
    const modalShow = ref(true)
    const crops = ref(CROP_TYPES_LIST)
    const shouldDisplayFieldModal = computed(() => !!selectedField.value && showFieldModal.value)

    /**
     * Function triggered when field on the map is clicked
     * @param fieldId
     */
    const fieldClicked = fieldId => {
      selectedField.value = fieldStore.getField(fieldId)
      showFieldModal.value = true
    }

    const closeFieldModal = () => {
      showFieldModal.value = false
    }

    const closeCreateFieldModal = () => {
      showCreateFieldModal.value = false
    }

    /**
     * Function triggered when field value is changed
     * @param field
     */
    const updateField = field => {
      fieldStore.updateField(field)
    }

    /**
     * Function triggered when user click save after drawing it
     * @param field
     */
    const saveCreatedField = ({ geometry: { coordinates } }) => {
      newFieldCoordinates = formatCoordinatesToObject(coordinates[0])
      showCreateFieldModal.value = true
    }

    /**
     * Function triggered when create field event is emitted
     * @param field
     */
    const createField = field => {
      field.coordinates = newFieldCoordinates
      newFieldCoordinates = []
      console.log(field)
      fieldStore.addField(field)
    }

    onMounted(_ => {
      fieldStore.loadFields()
    })

    return {
      fields,
      selectedField,
      showFieldModal,
      showCreateFieldModal,
      crops,
      shouldDisplayFieldModal,
      modalShow,
      fieldClicked,
      closeFieldModal,
      closeCreateFieldModal,
      updateField,
      saveCreatedField,
      createField
    }
  }
}
</script>
