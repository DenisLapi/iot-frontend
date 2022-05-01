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
        <span class="crop-details__chart-icon">{{ cropIcon }}</span>
      </div>
    </div>
    <div>
      <h2>Crop Details</h2>
      <div class="crop-details__info">
        <Select
          v-model="cropRef.type"
          label="Crop"
          :options="cropsList"
        />
        <Input
          v-model="cropRef.hybrid"
          placeholder="Enter hybrid"
          label="Hybrid"
        />
        <Input
          v-model="cropRef.plantingDate"
          placeholder="Enter planting date"
          label="Planting date"
          type="date"
        />
        <Input
          v-model="cropRef.harvestingDate"
          placeholder="Enter harvesting date"
          label="Harvesting date"
          type="date"
        />
        <data-group label="Expenses" :value="`$${expenses}`" />
        <data-group label="Income" :value="`$${income}`" />
        <data-group label="Profit" :value="`$${profit}`" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import moment from 'moment'
import DoughnutChart from '@/components/molecules/charts/DoughnutChart'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import DataGroup from '@/components/atoms/DataGroup'

export default {
  name: 'CropDetailsHeader',
  components: {
    DoughnutChart,
    Input,
    Select,
    DataGroup
  },
  props: {
    crop: {
      type: Object,
      required: true
    },
    cropsList: {
      type: Array,
      required: true
    }
  },
  setup (props, { emit }) {
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

    const cropRef = computed(() => props.crop)

    /**
     * Computed value calculates amount of days passed after planting
     * @type {ComputedRef<number>}
     */
    const daysAfterPlanting = computed(() => moment().diff(cropRef.value.plantingDate, 'days'))

    /**
     * Computed value count days before harvesting
     * @type {ComputedRef<number>}
     */
    const daysBeforeHarvesting = computed(() => {
      return moment(cropRef.value.harvestingDate, 'YYYY-MM-DD').diff(moment(), 'days')
    })

    /**
     * Computed value calculates the total expenses we had for one crop
     * @type {ComputedRef<unknown>}
     */
    const expenses = computed(() => {
      if (!cropRef.value.finance || !cropRef.value.finance.length) return 0
      return cropRef.value.finance.reduce((sum, finance) => {
        return finance.type === 'expense' ? Number(sum) + Number(finance.money) : Number(sum)
      }, 0)
    })

    /**
     * Computed value calculates the total income we had for one crop
     * @type {ComputedRef<unknown>}
     */
    const income = computed(() => {
      if (!cropRef.value.finance || !cropRef.value.finance.length) return 0
      return cropRef.value.finance.reduce((sum, finance) => {
        return finance.type === 'income' ? Number(sum) + Number(finance.money) : Number(sum)
      }, 0)
    })

    /**
     * Computed value calculates the profit for crop
     * @type {ComputedRef<unknown>}
     */
    const profit = computed(() => income.value - expenses.value)

    /**
     * Computed value which returns the emoji/icon for selected crop
     * @type {ComputedRef<*>}
     */
    const cropIcon = computed(() => {
      const index = props.cropsList.findIndex(crop => cropRef.value.type === crop.value)
      return props.cropsList[index].icon
    })

    watch(() => cropRef.value, (value, old) => {
      emit('onChange', value)
    }, { deep: true })

    return {
      chartOptions,
      chartData,
      cropRef,
      daysAfterPlanting,
      daysBeforeHarvesting,
      expenses,
      income,
      profit,
      cropIcon
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
    font-size: 60px;
  }
}
</style>
