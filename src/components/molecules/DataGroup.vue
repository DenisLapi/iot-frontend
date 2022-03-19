<template>
  <div class="data-group">
    <p class="data-group__label">{{ label }}</p>
    <p class="data-group__value">{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: 'DataGroup',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.data-group {
  &__label {
    font-size: 12px;
    margin: 0;
  }
  &__value {
    font-size: 14px;
    margin: 5px 0 15px;
    font-weight: bold;
  }
}
</style>
