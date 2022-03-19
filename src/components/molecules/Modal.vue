<o-modal
  scroll="clip"
  :active.sync="show"
  :width="width"
>
  <slot />
</o-modal>

<script>
import { computed } from 'vue'
export default {
  name: 'Modal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 640
    }
  },
  setup (props, { emit }) {
    const show = computed(() => ({
      get () {
        return props.isVisible
      },
      set (value) {
        emit('close', value)
      }
    }))
    return {
      show
    }
  }
}
</script>
