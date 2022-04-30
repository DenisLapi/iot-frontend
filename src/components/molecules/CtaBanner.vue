<template>
  <div class="cta-banner">
    <slot>
      <div>
        <div>
          <h3 class="cta-banner__headline">{{ headline }}</h3>
          <p class="cta-banner__description">{{ description }}</p>
        </div>
        <div class="cta-banner__buttons">
          <Button
            type="primary"
            @click="$emit('onConfirm')"
          >
            <icon
              v-if="isConfirming"
              name="loading"
              color="#fefefe"
              class="btn-loading-icon"
            />
            Confirm
          </Button>
          <Button @click="$emit('onCancel')">Cancel</Button>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

export default {
  name: 'CtaBanner',
  components: {
    Icon,
    Button
  },
  props: {
    headline: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    isConfirming: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.cta-banner {
  background: #ffffff;
  box-shadow: 1px 1px 20px rgba(163, 173, 192, 0.18);
  border-radius: 8px;
  width: 100%;
  padding: 20px;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__headline {
    margin: 0 0 5px;
  }
  &__description {
    color: #a5b2bc;
    margin: 0;
    font-size: 14px;
  }
  &__buttons ::v-deep .button {
    margin-left: 10px;
  }
}

.btn-loading-icon {
  animation: rotation 3s infinite linear;
  margin-right: 5px;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
