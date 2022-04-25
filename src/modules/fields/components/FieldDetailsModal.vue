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
      <Button class="mt-15 mr-15">All sensors</Button>
      <crop-list-item
        v-for="(crop, index) in fieldRef.crops"
        class="mt-15"
        icon="trash"
        :crops-list="cropTypesList"
        :crop="crop"
        @on-submit="deleteCrop(index)"
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
        type="primary"
        class="mr-15"
      >
        Save
      </Button>
      <Button
        class="mr-15"
        @click="closeModal()"
      >
        Cancel
      </Button>
      <Button
        type="danger"
        @click="deleteField()"
      >
        Delete
      </Button>
    </div>
  </right-side-modal>
</template>

<script>
import {
  computed,
  watch,
  ref
} from 'vue'
import { CROP_TYPES_LIST } from '../../crops/utils/crops'
import DataGroup from '@/components/atoms/DataGroup'
import RightSideModal from '@/components/molecules/RightSideModal'
import SensorCard from '@/modules/sensors/components/SensorCard'
import Button from '@/components/atoms/Button'
import CropListItem from '@/modules/crops/components/CropListItem'

export default {
  name: 'FieldDetailsModal',
  components: {
    DataGroup,
    RightSideModal,
    SensorCard,
    Button,
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
    }
  },
  setup (props, { emit }) {
    const cropTypesList = ref(CROP_TYPES_LIST)
    const fieldRef = ref(props.field)
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
     * @param index
     */
    const deleteCrop = index => {
      fieldRef.value.crops.splice(index, 1)
    }

    /**
     * Function to add crop for the field crop list
     */
    const addCrop = () => {
      fieldRef.value.crops.unshift({ ...CROP_TYPES_LIST })
    }

    /**
     * Function emits delete event with the field data
     */
    const deleteField = () => {
      emit('onDelete', fieldRef.value)
      closeModal()
    }

    watch(show, isVisible => {
      if (isVisible) {
        fieldRef.value = props.field
      }
    })

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
      deleteField
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
h3 {
  margin: 15px 0;
}
.mt-0 {
  margin-top: 0;
}
.mt-15 {
  margin-top: 15px;
}
.mr-15 {
  margin-right: 15px;
}
</style>
