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
    font-size: 14px;
    font-weight: bold;
    margin: 0;
  }
  &__value {
    font-size: 18px;
    margin: 5px 0 15px;
  }
}
</style>
