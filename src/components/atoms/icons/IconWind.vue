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
    class="feather feather-thermometer"
  >
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
  </svg>
</template>

<script>
export default {
  name: 'IconWind',
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
