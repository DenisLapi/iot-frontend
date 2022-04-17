<template>
  <modal
    :is-visible="show"
    :max-width="1200"
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
    <h3 class="mt-0">Crops</h3>
    <div class="data-grid">
      <Input
        v-model="cropForm.name"
        placeholder="Enter crop name"
        label="Crop name"
      />
      <o-datepicker
        v-model="cropForm.plantingDate"
        placeholder="Select planting date"
        :show-week-number="true"
        :locale="'en-US'"
        trap-focus
      />
    </div>
  </modal>
</template>

<script>
import { ref, computed } from 'vue'
import Input from '@/components/atoms/Input'
import Modal from '@/components/molecules/Modal'

export default {
  name: 'FieldDetailsModal',
  components: {
    Modal,
    Input
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
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
    const cropForm = ref({
      name: '',
      plantingDate: '',
      harvestingDate: '',
      yield: ''
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

    return {
      field,
      cropForm,
      show,
      closeModal
    }
  }
}
</script>

<style lang="scss" scoped>
.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 49%);
  column-gap: 2%;
  row-gap: 13px;
  ::v-deep .input__field {
    width: 100%;
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
.mb-15 {
  margin-bottom: 15px;
}
</style>
