<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-eye"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
</template>

<script>
export default {
  name: 'IconEye',
  props: {
    color: {
      type: String,
      default: '#828282',
      required: false
    },
    width: {
      type: Number,
      default: 24,
      required: false
    },
    height: {
      type: Number,
      default: 24,
      required: false
    }
  }
}
</script>
