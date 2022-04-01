<template>
  <right-side-modal
    class="field-details-modal"
    :is-visible="show"
    :max-width="'auto'"
    @onClose="closeModal"
  >
    <div class="data-grid">
      <data-group
        v-for="({ label, value}, index) in fieldValues"
        :key="index"
        :label="label"
        :value="value"
      />
    </div>
    <divider />
    <h3>Recent Notes</h3>
    <div class="notes">
      <p
        v-if="!notes.length"
        class="no-notes-text"
      >
        There are no notes yet <br>
        <a href="#">Add notes</a>
      </p>
      <div v-else>
        <note
          v-for="({ type, message, createdDate }, index) in notes"
          :key="index"
          :label="noteLabel({ type, createdDate })"
          :message="message"
        />
      </div>
    </div>
  </right-side-modal>
</template>

<script>
import { computed } from 'vue'
import DataGroup from '@/components/atoms/DataGroup'
import RightSideModal from '@/components/molecules/RightSideModal'
import Divider from '@/components/atoms/Divider'
import Note from '@/modules/notes/components/Note'

export default {
  name: 'FieldDetailsModal',
  components: {
    DataGroup,
    RightSideModal,
    Divider,
    Note
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    field: {
      type: Object,
      required: true
    }
  },
  setup (props, { emit }) {
    const show = computed({
      get () {
        return props.isVisible
      },
      set (value) {
        emit('onClose', value)
      }
    })
    const fieldValues = computed(() => [
      { label: 'Title', value: props.field.title },
      { label: 'Size', value: props.field.size },
      { label: 'Company', value: props.field.company.name },
      { label: 'Manager', value: props.field.manager.name }
    ])
    const notes = computed(() => props.field.notes)
    /**
     * Function triggered by framework when modal is closed
     * @param value
     */
    const closeModal = value => emit('onClose', value)
    const noteLabel = ({ type, createdDate }) => `${type} • ${createdDate}`
    return {
      show,
      closeModal,
      fieldValues,
      notes,
      noteLabel
    }
  }
}
</script>

<style lang="scss" scoped>
.data-grid {
  display: grid;
  grid-template-columns: 50% 50%;
}
h3 {
  margin: 15px 0;
}
.no-notes-text {
  text-align: center;
  font-size: 14px;
  color: #a5b2bc;
}
</style>
