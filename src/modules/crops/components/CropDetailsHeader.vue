<template>
  <div
    v-if="crop"
    class="crop-details__header"
  >
    <div>
      <div class="crop-details__crop-icon"></div>
    </div>
    <div class="crop-details__info">
      <data-group label="Name" :value="crop.type" />
      <data-group label="Hybrid" :value="crop.hybrid" />
      <data-group label="Planting date" :value="crop.plantingDate" />
      <data-group label="Harvesting date" :value="crop.harvestingDate" />
      <data-group label="Expenses" :value="`$${expenses}`" />
      <data-group label="Income" :value="`$${income}`" />
      <data-group label="Profit" :value="`$${profit}`" />
    </div>
  </div>
</template>

<script>
import DataGroup from '@/components/atoms/DataGroup'
import { computed } from 'vue'

export default {
  name: 'CropDetailsHeader',
  components: {
    DataGroup
  },
  props: {
    crop: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    /**
     * Computed value calculates the total expenses we had for one crop
     * @type {ComputedRef<unknown>}
     */
    const expenses = computed(() => {
      if (!props.crop.finance && !props.crop.finance.length) return 0
      return props.crop.finance.reduce((sum, finance) => {
        return finance.type === 'expense' ? Number(sum) + Number(finance.money) : Number(sum)
      }, 0)
    })

    /**
     * Computed value calculates the total income we had for one crop
     * @type {ComputedRef<unknown>}
     */
    const income = computed(() => {
      if (!props.crop.finance.length) return 0
      return props.crop.finance.reduce((sum, finance) => {
        return finance.type === 'income' ? Number(sum) + Number(finance.money) : Number(sum)
      }, 0)
    })

    /**
     * Computed value calculates the profit for crop
     * @type {ComputedRef<unknown>}
     */
    const profit = computed(() => income.value - expenses.value)

    return {
      expenses,
      income,
      profit
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
}
</style>
