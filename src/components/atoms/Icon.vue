<template>
    <component
      :is="icon"
      :color="color"
      :width="size"
      :height="size"
    />
</template>

<script>
import { computed } from 'vue'
import IconTemperature from '@/components/atoms/icons/IconTemperature'
import IconWind from '@/components/atoms/icons/IconWind'
import IconDrop from '@/components/atoms/icons/IconDrop'
import IconCrossHair from '@/components/atoms/icons/IconCrossHair'
import IconBattery from '@/components/atoms/icons/IconBattery'

export default {
  name: 'Icon',
  props: {
    name: {
      type: String
    },
    size: {
      type: Number,
      default: 24,
      required: false
    },
    color: {

    }
  },
  setup (props) {
    const icon = computed(_ => {
      switch (props.name) {
        case 'temperature':
          return IconTemperature
        case 'wind':
          return IconWind
        case 'humidity':
          return IconDrop
        case 'crosshair':
          return IconCrossHair
        case 'battery':
          return IconBattery
        default:
          return new Error('Icon not found')
      }
    })
    return {
      icon
    }
  }
}
</script>
