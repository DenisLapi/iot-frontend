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
    class="feather feather-drop"
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
  </svg>
</template>

<script>export default {
  name: 'IconDrop',
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
