<template>
  <right-side-modal
    class="field-details-modal"
    :is-visible="show"
    :max-width="'auto'"
    @on-close="closeModal"
  >
    <div class="wrapper">
      <h3 class="mt-0">Basic information</h3>
      <div class="data-grid">
        <data-group
          v-for="({ label, value}, index) in fieldValues"
          :key="index"
          :label="label"
          :value="value"
        />
      </div>
      <div class="data-grid mt-15">
        <sensor-card
          v-for="(sensor, index) in fieldRef.sensors"
          :key="index"
          :sensor="sensor"
          @on-change="newValue => updateSensor(newValue, index)"
        />
      </div>
      <crop-list-item
        v-for="(crop, index) in fieldRef.crops"
        :key="crop.id || index"
        class="mt-15"
        icon="trash"
        :crops-list="cropTypesList"
        :crop="crop"
        :preview-enable="Boolean(crop.id)"
        @on-preview="previewCrop(crop)"
        @on-submit="deleteCrop(crop, index)"
      />
      <Button
        class="mt-15"
        @click="addCrop()"
      >
        Add crop
      </Button>
    </div>
    <div class="footer">
      <Button
        type="danger"
        class="mr-15"
        @click="deleteField()"
      >
        Delete
      </Button>
      <Button
        type="primary"
        class="mr-15"
        @click="saveField"
      >
        <icon
          v-if="isSaving"
          name="loading"
          color="#fefefe"
          class="btn-loading-icon"
        />
        Save
      </Button>
      <Button
        class="mr-15"
        @click="closeModal()"
      >
        Cancel
      </Button>
    </div>
  </right-side-modal>
</template>

<script>
import {
  computed,
  ref
} from 'vue'
import { CROP_TYPES_LIST, EMPTY_CROP_SCHEMA } from '../../crops/utils/crops'
import DataGroup from '@/components/atoms/DataGroup'
import RightSideModal from '@/components/molecules/RightSideModal'
import SensorCard from '@/modules/sensors/components/SensorCard'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import CropListItem from '@/modules/crops/components/CropListItem'

export default {
  name: 'FieldDetailsModal',
  components: {
    DataGroup,
    RightSideModal,
    SensorCard,
    Button,
    Icon,
    CropListItem
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    field: {
      type: Object,
      required: true
    },
    isSaving: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const cropTypesList = ref(CROP_TYPES_LIST)
    const fieldRef = computed(() => props.field)
    const fieldValues = computed(() => [
      { label: 'Name', value: fieldRef.value.title },
      { label: 'Size', value: fieldRef.value.size },
      { label: 'Company', value: fieldRef.value.company.name },
      { label: 'Manager', value: fieldRef.value.manager.name }
    ])
    const show = computed({
      get () {
        return props.isVisible
      },
      set (value) {
        emit('onClose', value)
      }
    })

    /**
     * Function triggered by framework when modal is closed
     * @param value
     */
    const closeModal = value => emit('onClose', value)

    /**
     * Function generates note label
     * @param type
     * @param createdDate
     * @returns {`${string} • ${string}`}
     */
    const noteLabel = ({ type, createdDate }) => `${type} • ${createdDate}`

    /**
     * Update sensor value in sensors list
     * @param newValue Sensor object value
     * @param index Index in sensors list
     */
    const updateSensor = (newValue, index) => {
      fieldRef.value.sensors[index] = newValue
      emit('onChange', fieldRef.value)
    }

    /**
     * Function to delete the crop from field crop list
     * @param crop
     * @param index
     */
    const deleteCrop = (crop, index) => {
      if (crop.id) {
        emit('onDeleteCrop', crop)
      } else {
        fieldRef.value.crops.splice(index, 1)
      }
    }

    /**
     * Function to add crop for the field crop list
     */
    const addCrop = () => {
      const field = { ...fieldRef.value }
      if (!field.crops) {
        field.crops = []
      }
      field.crops.unshift({
        fieldId: fieldRef.value.id,
        ...EMPTY_CROP_SCHEMA
      })
      emit('onAddCrop', field)
    }

    /**
     * Function emits preview event with the crop data
     * @param crop
     */
    const previewCrop = crop => {
      emit('onPreviewCrop', crop)
    }

    /**
     * Function emits delete event with the field data
     */
    const deleteField = () => {
      emit('onDelete', fieldRef.value)
      closeModal()
    }

    /**
     * Function emits save event with the field data
     * @param _
     */
    const saveField = _ => {
      emit('onSave', { ...fieldRef.value })
    }

    return {
      cropTypesList,
      fieldRef,
      fieldValues,
      show,
      closeModal,
      noteLabel,
      updateSensor,
      deleteCrop,
      addCrop,
      previewCrop,
      deleteField,
      saveField
    }
  }
}
</script>

<style lang="scss" scoped>
.field-details-modal ::v-deep .o-modal__content {
  width: 1000px;
  display: flex;
  flex-direction: column;
}
.footer {
  margin-top: auto;
  display: flex;
  & > :first-child {
    margin-left: auto;
  }
}
.data-grid {
  display: grid;
  grid-template-columns: repeat(3, 32%);
  column-gap: 2%;
  row-gap: 13px;
  &--5 {
    grid-template-columns: auto auto auto auto auto;
    column-gap: 10px;
  }
}

.btn-loading-icon {
  animation: rotation 3s infinite linear;
  margin-right: 5px;
}

h3 {
  margin: 15px 0;
}
.mt-0 {
  margin-top: 0;
}
.mt-15 {
  margin-top: 15px;
}
.mr-5 {
  margin-right: 5px;
}
.mr-15 {
  margin-right: 15px;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
