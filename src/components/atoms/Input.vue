<template>
  <div>
    <p
      v-if="label"
      class="input__label"
    >{{ label }}</p>
    <input
      class="input__field"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      @input="onInput"
      @change="onChange"
    >
  </div>
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: [Number, String],
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
  &__field {
    width: 100%;
    border-radius: 8px;
    padding: 9px 13px;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    line-height: 16px;
    height: 47px;
    border: 2px solid rgba(165, 178, 188, .3);
    resize: none;
    outline: none;
    transition: border-color .1s, border-width .1s;

    &:focus {
      border-color: #27ae60;
    }

    &:disabled {
      color: rgba(165, 178, 188, .5);
      border-color: rgba(165, 178, 188, .2);
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
  &__label {
    font-size: 12px;
    margin: 0 0 5px;
    color: #a5b2bc;
  }
}
</style>
