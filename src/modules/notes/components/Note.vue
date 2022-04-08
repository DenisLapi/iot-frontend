<template>
  <div class="note">
    <data-group
      :label="label"
      :value="message"
    />
  </div>
</template>

<script>
import DataGroup from '@/components/atoms/DataGroup'

export default {
  name: 'Note',
  components: {
    DataGroup
  },
  props: {
    label: {
      type: [String, Number],
      required: true
    },
    message: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.note ::v-deep .data-group__label {
  text-transform: uppercase;
}
</style>
