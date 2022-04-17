<template>
  <ul class="map-controls">
    <li
      v-for="(option, index) in displayOptions"
      :key="index"
      class="map-controls__item">
      <button
        class="map-controls__button"
        @click="option.callback()"
      >
        <icon
          :name="option.icon"
          :height="15"
          :width="15"
          :color="'white'"
        />
      </button>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue'
import Icon from '@/components/atoms/Icon'

export default {
  name: 'MapControls',
  components: {
    Icon
  },
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const displayOptions = computed(() => props.options.filter(option => !option.hide))
    return { displayOptions }
  }
}
</script>

<style lang="scss" scoped>
.map-controls {
  box-shadow: 0 5px 10px rgba(0, 0, 0, .25);
  background-color: #222;
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
  border-radius: 20px;
  display: inline-flex;
  &__button {
    border-width: 0;
    margin: 0;
    padding: 0;
    width: 40px;
    height: 40px;
    background-color: rgba(17,17,17,0);
    transition: color .1s,background-color .1s;
    vertical-align: top;
    color: #ebebeb;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: #000;
    }
  }
  li:first-child button {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  li:last-child button {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}
</style>
