<template>
  <div class="data-group">
    <span class="data-group__label">{{ label }}</span>
    <span class="data-group__value">{{ value }}</span>
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
  span {
    display: block;
  }
  &__label {
    font-size: 12px;
    margin: 0;
    color: #a5b2bc;
  }
  &__value {
    font-size: 16px;
    margin: 0;
  }
}
</style>
