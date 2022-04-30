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
    <tr
      v-for="({ type, description, money, date }, index) in dataComp"
      :key="index"
    >
      <td class="finance-table__box-icon">
        <div class="finance-table__icon">
          <icon
            :name="iconSettings(type).name"
            :color="iconSettings(type).color" />
        </div>
      </td>
      <td>{{ description }}</td>
      <td>
        <span
          class="finance-table__label"
          :class="moneyClass(type)"
        >
          ${{ money }}
        </span>
      </td>
      <td>{{ date }}</td>
      <td>
        <Button
          type="small"
          @click="$emit('onRemove', index)"
        >
          Remove
        </Button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { computed, watch } from 'vue'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

export default {
  name: 'FinanceTable',
  components: {
    Button,
    Icon
  },
  props: {
    data: {
      type: Array,
      required: false
    }
  },
  setup (props, { emit }) {
    const dataComp = computed(() => props.data)

    /**
     * Function returns icon settings based on the money type
     * @param type
     * @returns {{color: string, name: string}|{color: string, name: string}}
     */
    const iconSettings = type => {
      return type.toLowerCase() === 'income'
        ? { name: 'trend-up', color: '#80b215' }
        : { name: 'trend-down', color: '#ec3636' }
    }

    /**
     * Function returns money class
     * @param type
     * @returns {string[]}
     */
    const moneyClass = type => {
      return type.toLowerCase() === 'income' ? ['income'] : ['expense']
    }

    watch(dataComp, value => {
      emit('onChange', value)
    }, { deep: true })

    return {
      dataComp,
      iconSettings,
      moneyClass
    }
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
    &.income {
      background-color: #27ae60;
    }
    &.expense {
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
.mr-10 {
  margin-right: 10px;
}
</style>
