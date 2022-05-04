<template>
  <div class="token">
    <p
      v-if="label"
      class="token__label"
    >
      {{ label }}
    </p>
    <div class="token__input">{{ token }}</div>
  </div>

</template>

<script>
export default {
  name: 'Token',
  props: {
    token: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.token {
  width: 100%;
  &__label {
    font-size: 12px;
    margin: 0 0 5px;
    color: #a5b2bc;
  }
  &__input {
    border-radius: 4px;
    padding: 10px;
    background: #d8dfe6;
    color: #495161;
    font-size: 14px;
  }
}
</style>
