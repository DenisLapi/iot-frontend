<template>
  <button
    class="button"
    :class="type"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 9px 13px;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  line-height: 16px;
  height: 48px;
  border: 2px solid rgba(165, 178, 188, 0.3);
  resize: none;
  outline: none;
  transition: all .5s ease;
  background: transparent;
  cursor: pointer;
  &:hover {
    background: #ededed;
  }
  &.primary {
    background: #27ae60;
    border-color: #27ae60;
    color: #fff;
    &:hover {
      background: #33c070;
    }
  }
  &.danger {
    background: #fa4444;
    border-color: #ea4141;
    color: #fff;
    &:hover {
      background: #f36363;
    }
  }
  &.small {
    height: 40px;
    font-size: 14px;
  }
  &.fluid {
    width: 100%;
  }
}
</style>
