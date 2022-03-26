<template>
  <div class="sensor-details-row">
    <data-group
      label="Name"
      :value="name"
    />
    <tooltip
      position="left"
      :label="type"
    >
      <data-group
        label="Type"
        :value="icon"
      />
    </tooltip>
    <Switch
      :value="sensorStatus"
      :onChange="onSwitchChange"
    />
  </div>
</template>

<script>
import { computed } from 'vue'
import { sensorIcon } from '@/modules/sensors/utils'
import DataGroup from '@/components/atoms/DataGroup'
import Tooltip from '@/components/atoms/Tooltip'
import Switch from '@/components/atoms/Switch'

export default {
  name: 'SensorDetailsRow',
  components: {
    Switch,
    DataGroup,
    Tooltip
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
        emit('onSetStatus', value)
      }
    })
    const icon = computed(_ => {
      return sensorIcon[props.type]
    })

    /**
     * Function triggered when switch change the value
     * @param value new value
     */
    const onSwitchChange = value => {
      sensorStatus.value = value
    }
    return {
      sensorStatus,
      icon,
      onSwitchChange
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
