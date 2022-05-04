<template>
  <div>
    <p
      v-if="label"
      class="label"
    >
      {{ label }}
    </p>
    <o-switch
      v-model="switchValue"
      :class="{ 'is-small': small }"
    />
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Switch',
  props: {
    value: {
      type: Boolean
    },
    small: {
      type: Boolean,
      default: false,
      required: false
    },
    label: {
      type: String,
      required: false
    }
  },
  setup (props, { emit }) {
    const switchValue = computed({
      get () {
        return props.value
      },
      set (value) {
        emit('input', value)
      }
    })
    return {
      switchValue
    }
  }
}
</script>

<style lang="scss" scoped>
.is-small {
  ::v-deep .o-switch__check {
    width: 2rem;
    height: calc(2em * 0.5 + 0.2em);
  }
  ::v-deep .o-switch__check-switch {
    height: calc((2rem - 0.2em * 2) * 0.5);
    width: calc((2rem - 0.2em * 2) * 0.5);
  }
  ::v-deep .o-switch__check--checked {
    background: #27ae60;
  }
}
.label {
  font-size: 12px;
  margin: 0 0 5px;
  color: #a5b2bc;
}
</style>
