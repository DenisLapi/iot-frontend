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
    class="feather feather-save"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
</template>

<script>
export default {
  name: 'IconSave',
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
