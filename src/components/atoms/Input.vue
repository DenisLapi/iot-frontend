<template>
  <input
    class="input"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="onInput"
    @change="onChange"
  >
</template>

<script>

export default {
  name: 'Input',
  props: {
    modelValue: {
      type: [Number, String]
    },
    type: {
      type: String,
      default: 'text',
      required: false
    },
    placeholder: {
      type: String,
      required: false
    }
  },
  setup (props, { emit }) {
    const onInput = event => {
      emit('update:modelValue', event.target.value)
    }
    const onChange = event => {
      emit('update:modelValue', event.target.value)
    }
    return { onInput, onChange }
  }
}
</script>

<style lang="scss" scoped>
.input {
  border-radius: 8px;
  padding: 9px 13px;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  line-height: 1.25rem;
  border: 2px solid rgba(165,178,188,.3);
  resize: vertical;
  outline: none;
  transition: border-color .1s,border-width .1s;
  &:focus {
    border-color: #27ae60;
  }
  &::placeholder {
    color: rgba(80, 91, 100, 0.3);
    opacity: 1;
  }
  &:-ms-input-placeholder {
    color: rgba(80, 91, 100, 0.3);
  }
  &::-ms-input-placeholder {
    color: rgba(80, 91, 100, 0.3);
  }
}
</style>
