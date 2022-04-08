<template>
  <div class="menu-group">
    <div
      v-for="({ label, icon, callback }, index) in options"
      class="menu-group__option"
      :class="{ 'is-clickable' : isClickable(callback) }"
      :key="index"
      @click="clickHandler(callback)"
    >
      <icon
        color="#ccc"
        size="15"
        :name="icon"
      />
      <p class="menu-group__label">{{ label }}</p>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon'

export default {
  name: 'MenuGroup',
  components: { Icon },
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  setup () {
    const isClickable = (callback) => callback && callback instanceof Function
    const clickHandler = (callback) => {
      if (callback && callback instanceof Function) {
        callback()
      }
    }
    return {
      isClickable,
      clickHandler
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-group {
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  &__option {
    padding: 0 10px;
    text-align: center;
    &:not(:last-child) {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        height: 15px;
        width: 1px;
        background: #dedede;
      }
    }
    &.is-clickable {
      cursor: pointer;
    }
  }
  &__label {
    font-size: 12px;
    text-align: center;
    margin: 0;
  }
}
</style>
