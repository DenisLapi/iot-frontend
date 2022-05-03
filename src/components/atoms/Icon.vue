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
import IconSelect from '@/components/atoms/icons/IconSelect'
import IconLayout from '@/components/atoms/icons/IconLayout'
import IconSave from '@/components/atoms/icons/IconSave'
import IconPlus from '@/components/atoms/icons/IconPlus'
import IconTrash from '@/components/atoms/icons/IconTrash'
import IconTrendDown from '@/components/atoms/icons/IconTrendDown'
import IconTrendUp from '@/components/atoms/icons/IconTrendUp'
import IconEye from '@/components/atoms/icons/IconEye'
import IconLoading from '@/components/atoms/icons/IconLoading'
import IconChevronLeft from '@/components/atoms/icons/IconChevronLeft'
import IconCpu from '@/components/atoms/icons/IconCpu'

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
        case 'select':
          return IconSelect
        case 'layout':
          return IconLayout
        case 'save':
          return IconSave
        case 'plus':
          return IconPlus
        case 'trash':
          return IconTrash
        case 'trend-down':
          return IconTrendDown
        case 'trend-up':
          return IconTrendUp
        case 'eye':
          return IconEye
        case 'loading':
          return IconLoading
        case 'chevron-left':
          return IconChevronLeft
        case 'cpu':
          return IconCpu
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
