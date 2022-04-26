<template>
  <div class="crop-details">
    <div class="crop-details__header">
      <div>
        <div class="crop-details__crop-icon">🧅</div>
      </div>
      <div class="crop-details__info">
        <data-group label="Name" value="Sunflower" />
        <data-group label="Hybrid" value="S320" />
        <data-group label="Planting date" value="2022-03-03" />
        <data-group label="Harvesting date" value="2022-08-08" />
        <data-group label="Invested" value="$350" />
        <data-group label="Earned" value="$500" />
      </div>
    </div>
    <div class="crop-details__finance-headline mt-50">
      <h2>Financial details</h2>
      <Button type="small primary">
        <Icon name="plus" color="white" />
        Add more
      </Button>
    </div>
    <finance-table class="mt-20" />
  </div>
</template>

<script>
import Button from '@/components/atoms/Button'
import DataGroup from '@/components/atoms/DataGroup'
import FinanceTable from '@/components/molecules/FinanceTable'
import Icon from '@/components/atoms/Icon'

export default {
  name: 'CropDetails',
  components: {
    Icon,
    Button,
    FinanceTable,
    DataGroup
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
    grid-template-columns: repeat(2, auto);
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
