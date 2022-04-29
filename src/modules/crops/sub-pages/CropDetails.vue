<template>
  <div class="crop-details">
    <crop-details-header
      v-if="selectedCrop"
      :crop="selectedCrop"
    />
    <div class="crop-details__finance-headline mt-50">
      <h2>Financial details</h2>
      <Button
        type="small primary"
        @click="showFinanceModal"
      >
        <Icon name="plus" color="white" />
        Add more
      </Button>
    </div>
    <finance-table
      v-if="hasFinanceData"
      class="mt-20"
      :data="selectedCrop.finance"
    />
    <finance-modal
      :is-visible="financeModalVisible"
      @on-close="closeFinanceModal"
      @on-save="saveFinancialDetail"
    />
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia/dist/pinia'
import { useCropStore } from '../store'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import FinanceTable from '@/components/molecules/FinanceTable'
import FinanceModal from '@/components/molecules/FinanceModal'
import CropDetailsHeader from '@/modules/crops/components/CropDetailsHeader'

export default {
  name: 'CropDetails',
  components: {
    CropDetailsHeader,
    Icon,
    Button,
    FinanceTable,
    FinanceModal
  },
  setup () {
    const route = useRoute()
    const cropStore = useCropStore()
    const { selectedCrop } = storeToRefs(cropStore)
    const financeModalVisible = ref(false)

    /**
     * Computed value returns if crop has finance data
     * @type {ComputedRef<*>}
     */
    const hasFinanceData = computed(() => selectedCrop.value && selectedCrop.value.finance.length)

    /**
     * Function triggered to when close event emitted on finance model
     */
    const closeFinanceModal = () => {
      financeModalVisible.value = false
    }

    /**
     * Function triggered when add more finance button is clicked
     */
    const showFinanceModal = () => {
      financeModalVisible.value = true
    }

    /**
     * Function triggered when save financial is emitted
     * @param details
     */
    const saveFinancialDetail = details => {
      financeModalVisible.value = false
      selectedCrop.value.finance.push({ ...details })
    }

    onMounted(_ => {
      cropStore.selectCrop(route.params.id)
    })

    return {
      selectedCrop,
      financeModalVisible,
      hasFinanceData,
      closeFinanceModal,
      showFinanceModal,
      saveFinancialDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.crop-details {
  padding: 40px;
  min-height: 100vh;
  background-color: #f5f6f8;
  &__finance-headline {
    display: flex;
    align-items: center;
    > * {
      margin-right: 20px;
    }
  }
}
.mt-20 {
  margin-top: 20px
}
.mt-50 {
  margin-top: 50px;
}
</style>
