<template>
  <div class="sensor-details-row">
    <data-group
      label="Name"
      :value="name"
    />
    <o-tooltip
      position="left"
      :label="type"
    >
      <data-group
        label="Type"
        :value="icon"
      />
    </o-tooltip>
    <o-switch v-model="sensorStatus" />
  </div>
</template>

<script>
import { computed } from 'vue'
import DataGroup from '@/components/atoms/DataGroup'
import { sensorIcon } from '@/modules/sensors/utils'

console.log(sensorIcon)

export default {
  name: 'SensorDetailsRow',
  components: {
    DataGroup
  },
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    },
    coordinates: {
      type: Object,
      required: false
    }
  },
  setup (props, { emit }) {
    const sensorStatus = computed({
      get () {
        return props.status
      },
      set (value) {
        emit('setSensorStatus', value)
      }
    })
    const icon = computed(_ => {
      return sensorIcon[props.type]
    })
    return {
      sensorStatus,
      icon
    }
  }
}
</script>

<style lang="scss" scoped>
.sensor-details-row {
  display: grid;
  grid-template-columns: 45% 45% 10%;
  border-radius: 5px;
  border: 1px solid #cecece;
  padding: 10px;
  ::v-deep .data-group__value {
    margin-bottom: 0;
  }
  ::v-deep .o-tip__content {
    border-radius: 3px;
    padding: 5px;
    color: #fff;
    text-transform: capitalize;
    font-size: 12px;
  }
}
</style>
