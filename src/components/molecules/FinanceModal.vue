<template>
  <Modal
    class="right-side-modal"
    scroll="clip"
    v-model:active="show"
    :width="500"
    @on-close="closeModal"
  >
    <Input
      v-model="form.description"
      placeholder="Enter description"
      class="mb-20"
    />
    <Input
      v-model="form.money"
      placeholder="Enter money"
      type="number"
      class="mb-20"
    />
    <Input
      v-model="form.date"
      type="date"
      class="mb-20"
    />
    <Select
      v-model="form.type"
      :options="selectOptions"
      class="mb-20"
    />
    <Button
      type="fluid primary"
      @click="saveForm"
    >
      Save
    </Button>
  </Modal>
</template>

<script>
import { ref, computed } from 'vue'
import Modal from '@/components/molecules/Modal'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'

export default {
  name: 'FinanceModal',
  components: {
    Modal,
    Input,
    Select,
    Button
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const form = ref({
      description: '',
      money: 0,
      date: '',
      type: ''
    })

    const selectOptions = ref([
      {
        id: 'income',
        value: 'income',
        label: 'Income'
      },
      {
        id: 'expense',
        value: 'expense',
        label: 'Expense'
      }
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
     * Function triggered when saving form
     */
    const saveForm = () => {
      emit('onSave', { ...form.value })
    }

    return {
      form,
      selectOptions,
      show,
      closeModal,
      saveForm
    }
  }
}
</script>

<style scoped>
.mb-20 {
  margin-bottom: 20px;
}
</style>
