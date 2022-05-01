<template>
  <div class="crop-list-item" :data-id="crop.id">
    <Select
      v-model="cropRef.type"
      label="Crop"
      :options="cropsList"
    />
    <Input
      v-model="cropRef.hybrid"
      placeholder="Enter hybrid"
      label="Hybrid"
    />
    <Input
      v-model="cropRef.plantingDate"
      placeholder="Enter planting date"
      label="Planting date"
      type="date"
    />
    <Input
      v-model="cropRef.harvestingDate"
      placeholder="Enter harvesting date"
      label="Harvesting date"
      type="date"
    />
    <Button
      v-if="previewEnable"
      class="mt-22"
      @click="$emit('onPreview', cropRef)"
    >
      <icon name="eye" />
    </Button>
    <Button
      class="mt-22"
      @click="$emit('onSubmit', cropRef)"
    >
      <icon :name="icon" />
    </Button>
  </div>
</template>

<script>
import { computed, watch } from 'vue'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Select from '@/components/atoms/Select'

export default {
  name: 'CropListItem',
  components: {
    Input,
    Select,
    Button,
    Icon
  },
  props: {
    crop: {
      type: Object,
      required: true
    },
    cropsList: {
      type: Array,
      required: true
    },
    icon: {
      type: String,
      default: 'plus',
      required: false
    },
    previewEnable: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const cropRef = computed(_ => props.crop)
    watch(cropRef, value => {
      emit('onUpdate', value)
    }, { deep: true })
    return { cropRef }
  }
}
</script>

<style lang="scss" scoped>
.crop-list-item {
  display: grid;
  grid-template-columns: repeat(6, auto);
  column-gap: 10px;
}
.mt-22 {
  margin-top: 22px;
}
</style>
