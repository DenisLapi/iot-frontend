<template>
  <table class="finance-table">
    <thead>
    <tr>
      <th class="finance-table__box-icon"></th>
      <th>Description</th>
      <th>Money</th>
      <th>Date</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td class="finance-table__box-icon">
        <div class="finance-table__icon">
          <icon name="trend-up" color="#80b215" />
        </div>
      </td>
      <td>Planting the crop...</td>
      <td>
        <span class="finance-table__label finance-table__label--income">$500</span>
      </td>
      <td>2022-05-05</td>
      <td>
        <Button type="small">Remove</Button>
      </td>
    </tr>
    <tr>
      <td class="finance-table__box-icon">
        <div class="finance-table__icon">
          <icon name="trend-down" color="#ec3636" />
        </div>
      </td>
      <td>Planting the crop...</td>
      <td>
        <span class="finance-table__label finance-table__label--expense">$500</span>
      </td>
      <td>2022-05-05</td>
      <td>
        <Button type="small">Remove</Button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

export default {
  name: 'FinanceTable',
  components: {
    Button,
    Icon
  }
}
</script>

<style lang="scss" scoped>
.finance-table {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  &__box-icon {
    width: 50px;
  }
  &__icon {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    margin: auto;
  }
  &__label {
    border-radius: 4px;
    color: white;
    padding: 2px 5px;
    &--income {
      background-color: #27ae60;
    }
    &--expense {
      background-color: #fa4444;
    }
  }
  th, td {
    padding: 10px;
  }
  thead {
    font-size: 12px;
  }
  tbody {
    font-size: 15px;
    td {
      transition: background .5s ease;
    }
    tr:hover td {
      background: #ffffff;
      &:first-child {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }
      &:last-child {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }
    }
  }
}
</style>
