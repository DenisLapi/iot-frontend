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
      @on-delete="deleteField"
      @on-save="saveField"
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
import { useCropStore } from '@/modules/crops/store'
import { CROP_TYPES_LIST } from '../crops/utils/crops'
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
    const cropStore = useCropStore()
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
    const fieldClicked = async fieldId => {
      selectedField.value = await fieldStore.getField(fieldId)
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
    const createField = async field => {
      field.coordinates = newFieldCoordinates
      const { crops } = field
      delete field.crops
      const createdField = await fieldStore.addField(field)
      for (let i = 0; i < crops.length; i++) {
        await cropStore.addCrop({ fieldId: createdField.id, ...crops[i] })
      }
      fieldStore.loadFields()
    }

    /**
     * Function triggered when delete field event is emitted
     * @param field
     */
    const deleteField = async field => {
      await fieldStore.deleteField(field)
      selectedField.value = false
      fieldStore.loadFields()
    }

    /**
     * Function is triggered when user save the field
     * @param field
     * @returns {Promise<void>}
     */
    const saveField = async field => {
      await fieldStore.updateField(field)
      fieldStore.loadFields()
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
      createField,
      deleteField,
      saveField
    }
  }
}
</script>
