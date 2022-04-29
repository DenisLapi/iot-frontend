<template>
  <div
    v-if="crop"
    class="crop-details__header"
  >
    <div>
      <div class="crop-details__chart-wrapper">
        <doughnut-chart
          :chart-data="chartData"
          :chart-options="chartOptions"
        />
        <span class="crop-details__chart-icon">🧅</span>
      </div>
    </div>
    <div>
      <h2>Crop Details</h2>
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
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import moment from 'moment'
import DataGroup from '@/components/atoms/DataGroup'
import DoughnutChart from '@/components/molecules/charts/DoughnutChart'

export default {
  name: 'CropDetailsHeader',
  components: {
    DataGroup,
    DoughnutChart
  },
  props: {
    crop: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const chartOptions = ref({
      responsive: true,
      cutout: '75%',
      events: []
    })

    const chartData = computed(() => {
      return {
        datasets: [{
          data: [daysAfterPlanting.value, daysBeforeHarvesting.value],
          backgroundColor: [
            '#33c070',
            '#cfe8b4'
          ]
        }]
      }
    })

    /**
     * Computed value calculates amount of days passed after planting
     * @type {ComputedRef<number>}
     */
    const daysAfterPlanting = computed(() => moment().diff(props.crop.plantingDate, 'days'))

    /**
     * Computed value count days before harvesting
     * @type {ComputedRef<number>}
     */
    const daysBeforeHarvesting = computed(() => {
      return moment(props.crop.harvestingDate, 'YYYY-MM-DD').diff(moment(), 'days')
    })

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
      chartOptions,
      chartData,
      daysAfterPlanting,
      daysBeforeHarvesting,
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
    grid-template-columns: 30% auto;
    column-gap: 20px;
  }
  &__info {
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-auto-rows: min-content;
    column-gap: 20px;
    row-gap: 20px;
  }
  &__chart-wrapper {
    width: 200px;
    height: 200px;
    position: relative;
    margin: auto;
  }
  &__chart-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
  }
}
</style>
