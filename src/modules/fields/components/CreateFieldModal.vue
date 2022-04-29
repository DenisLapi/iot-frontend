<template>
  <modal
    class="create-field-modal"
    :is-visible="show"
    :max-width="1300"
    @on-close="closeModal"
  >
    <h3 class="mt-0">Basic information</h3>
    <div class="data-grid">
      <Input
        v-model="field.title"
        placeholder="Enter field title"
        label="Title"
        class="mb-15"
      />
      <Input
        v-model="field.size"
        placeholder="Enter field size"
        label="Size"
        class="mb-15"
      />
    </div>
    <h3>Crops</h3>
    <crop-list-item
      v-for="(crop, index) in field.crops"
      class="mb-10"
      icon="trash"
      :crop="crop"
      :crops-list="cropTypeList"
      @on-update="value => updateFieldCrop(value, index)"
      @on-submit="deleteCrop(index)"
    />
    <Button @click="addCrop">Add crop</Button>
    <divider class="my-20" />
    <div class="footer">
      <Button
        type="primary"
        class="mr-15"
        @click="createField"
      >Create Field</Button>
      <Button @click="closeModal()">Cancel</Button>
    </div>
  </modal>
</template>

<script>
import { ref, computed } from 'vue'
import { CROP_TYPES_LIST, EMPTY_CROP_SCHEMA } from '@/modules/crops/utils/crops'
import Input from '@/components/atoms/Input'
import Modal from '@/components/molecules/Modal'
import CropListItem from '@/modules/crops/components/CropListItem'
import Divider from '@/components/atoms/Divider'
import Button from '@/components/atoms/Button'

export default {
  name: 'FieldDetailsModal',
  components: {
    Button,
    Input,
    Modal,
    CropListItem,
    Divider
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    crops: {
      type: Array,
      required: true
    }
  },
  setup (props, { emit }) {
    const cropTypeList = ref(CROP_TYPES_LIST)
    const field = ref({
      title: '',
      size: '',
      company: {
        id: 0,
        name: 'Agro group'
      },
      manager: {
        id: 2,
        name: 'Tobias Smith'
      },
      coordinates: [],
      crops: [],
      sensors: [],
      notes: []
    })
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
     * Function add crop to the field crop list
     */
    const addCrop = crop => {
      field.value.crops.push({ ...EMPTY_CROP_SCHEMA })
    }

    /**
     * Function to delete the crop from field crop list
     * @param index
     */
    const deleteCrop = index => {
      field.value.crops.splice(index, 1)
    }

    /**
     * Update field's crop with new value based on index
     * @param crop
     * @param index
     */
    const updateFieldCrop = (crop, index) => {
      field.value.crops[index] = crop
    }

    /**
     * Function triggered when you click on create field button
     */
    const createField = () => {
      emit('onCreate', { ...field.value })
      emit('onClose', true)
    }

    return {
      cropTypeList,
      field,
      show,
      closeModal,
      addCrop,
      deleteCrop,
      updateFieldCrop,
      createField
    }
  }
}
</script>

<style lang="scss" scoped>
.create-field-modal ::v-deep .o-modal__content {
  width: 1300px;
}
.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 49%);
  column-gap: 2%;
  row-gap: 13px;
  ::v-deep .input__field {
    width: 100%;
  }
  &--5 {
    grid-template-columns: auto auto auto auto auto;
    column-gap: 10px;
  }
}
h3 {
  margin: 15px 0;
}
.mr-15 {
  margin-right: 15px;
}
.mt-0 {
  margin-top: 0;
}
.mb-10 {
  margin-bottom: 10px;
}
.my-20 {
  margin: 20px auto;
}
.footer {
  display: flex;
  & > :first-child {
    margin-left: auto;
  }
}
</style>
