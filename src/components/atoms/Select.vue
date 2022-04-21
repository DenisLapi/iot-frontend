<template>
  <div>
    <p
      v-if="label"
      class="label"
    >
      {{ label }}
    </p>
    <select
      class="select"
      :value="modelValue"
      :name="name"
      :id="id"
      @input="onInput"
      @change="onChange"
    >
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    name: {
      type: [String, Number],
      required: false
    },
    id: {
      type: [String, Number],
      required: false
    },
    options: {
      type: Array,
      required: true
    },
    label: {
      type: [Number, String],
      required: false
    },
    modelValue: {
      type: [Number, String]
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

<style scoped>
.select {
  width: 100%;
  border-radius: 8px;
  padding: 9px 13px;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  line-height: 16px;
  height: 47px;
  border: 2px solid rgba(165, 178, 188, 0.3);
  outline: none;
  transition: border-color .1s, border-width .1s;
}
.label {
  font-size: 12px;
  margin: 0 0 5px;
  color: #a5b2bc;
}
</style>
