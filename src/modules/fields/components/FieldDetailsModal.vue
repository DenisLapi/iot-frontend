<template>
  <right-side-modal
    class="field-details-modal"
    :is-visible="show"
    :max-width="'auto'"
    @onClose="closeModal"
  >
    <h3 class="mt-0">Basic information</h3>
    <div class="data-grid">
      <data-group
        v-for="({ label, value}, index) in fieldValues"
        :key="index"
        :label="label"
        :value="value"
      />
    </div>
    <divider />

    <h3>Recent notifications</h3>
    <div class="notifications">
      <p
        v-if="!notifications.length"
        class="no-notifications-text"
      >
        There are no notifications yet <br>
        <a href="#">Add notifications</a>
      </p>
      <div v-else>
        <notification
          v-for="({ type, message, createdDate }, index) in notifications"
          :key="index"
          :label="noteLabel({ type, createdDate })"
          :message="message"
        />
      </div>
    </div>
    <divider />
  </right-side-modal>
</template>

<script>
import { computed } from 'vue'
import DataGroup from '@/components/atoms/DataGroup'
import RightSideModal from '@/components/molecules/RightSideModal'
import Divider from '@/components/atoms/Divider'
import Notification from '@/modules/notifications/components/Notification'

export default {
  name: 'FieldDetailsModal',
  components: {
    DataGroup,
    RightSideModal,
    Divider,
    Notification
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
    const notifications = computed(() => props.field.notifications)
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
      notifications,
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
.no-notifications-text {
  text-align: center;
  font-size: 14px;
  color: #a5b2bc;
}
.notifications ::v-deep .note {
  margin-bottom: 10px;
}
.mt-0 {
  margin-top: 0;
}
</style>
