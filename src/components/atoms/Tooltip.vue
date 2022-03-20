<template>
  <o-tooltip
    :position="position"
    :label="label"
  >
    <slot />
  </o-tooltip>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    position: {
      type: String,
      default: 'top'
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
