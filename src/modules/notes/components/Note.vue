<template>
  <div class="note">
    <p class="note__label">{{ label }}</p>
    <p class="note__message"> {{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Note',
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
.note {
  &__label {
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 500;
    margin: 0;
  }
  &__message {
    font-size: 15px;
    margin: 0;
  }
}
</style>
