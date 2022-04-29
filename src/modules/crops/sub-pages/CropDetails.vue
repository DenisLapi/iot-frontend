<template>
  <div class="crop-details">
    <div
      v-if="selectedCrop"
      class="crop-details__header"
    >
      <div>
        <div class="crop-details__crop-icon">🧅</div>
      </div>
      <div class="crop-details__info">
        <data-group label="Name" :value="selectedCrop.type" />
        <data-group label="Hybrid" :value="selectedCrop.hybrid" />
        <data-group label="Planting date" :value="selectedCrop.plantingDate" />
        <data-group label="Harvesting date" :value="selectedCrop.harvestingDate" />
        <data-group label="Expenses" :value="`$${expenses}`" />
        <data-group label="Income" :value="`$${income}`" />
        <data-group label="Profit" :value="`$${profit}`" />
      </div>
    </div>
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
import DataGroup from '@/components/atoms/DataGroup'
import FinanceTable from '@/components/molecules/FinanceTable'
import FinanceModal from '@/components/molecules/FinanceModal'
import Icon from '@/components/atoms/Icon'

export default {
  name: 'CropDetails',
  components: {
    Icon,
    Button,
    FinanceTable,
    FinanceModal,
    DataGroup
  },
  setup () {
    const route = useRoute()
    const cropStore = useCropStore()
    const { selectedCrop } = storeToRefs(cropStore)
    const financeModalVisible = ref(false)

    /**
     * Computed value calculates the total expenses we had for one crop
     * @type {ComputedRef<unknown>}
     */
    const expenses = computed(() => {
      if (!selectedCrop.value.finance.length) return 0
      return selectedCrop.value.finance.reduce((sum, finance) => {
        return finance.type === 'expense' ? Number(sum) + Number(finance.money) : Number(sum)
      }, 0)
    })

    /**
     * Computed value calculates the total income we had for one crop
     * @type {ComputedRef<unknown>}
     */
    const income = computed(() => {
      if (!selectedCrop.value.finance.length) return 0
      return selectedCrop.value.finance.reduce((sum, finance) => {
        return finance.type === 'income' ? Number(sum) + Number(finance.money) : Number(sum)
      }, 0)
    })

    /**
     * Computed value calculates the profit for crop
     * @type {ComputedRef<unknown>}
     */
    const profit = computed(() => income.value - expenses.value)

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
      console.log(selectedCrop.value)
    }

    onMounted(_ => {
      cropStore.selectCrop(route.params.id)
    })

    return {
      selectedCrop,
      financeModalVisible,
      expenses,
      income,
      profit,
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
  &__header {
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 1px 1px 20px rgba(163, 173, 192, 0.18);
    border-radius: 8px;
    display: grid;
    grid-template-columns: 25% auto;
    column-gap: 20px;
  }
  &__info {
    display: grid;
    grid-template-columns: repeat(4, auto);
    column-gap: 20px;
    row-gap: 20px;
  }
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
