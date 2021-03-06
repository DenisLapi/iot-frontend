<template>
  <div class="crop-details">
    <div class="mb-20">
      <router-link
        to="/fields"
        class="back-link"
      >
        <Icon
          name="chevron-left"
          color="#939ca6"
          :size="15"
        />
        Go to fields
      </router-link>
    </div>
    <crop-details-header
      v-if="isCropSelected"
      :crop="selectedCrop"
      :crops-list="cropTypesList"
      @on-change="onCropChange"
    />
    <div class="crop-details__finance-headline mt-50">
      <h2>Financial details</h2>
      <Button
        type="small primary"
        @click="showFinanceModal"
      >
        <Icon name="plus" color="white" />
        Add more
      </Button>
    </div>
    <finance-table
      v-if="isCropSelected && hasFinanceData"
      class="mt-20 mb-100"
      :data="selectedCrop.finance"
      @on-remove="removeFinanceDetail"
    />
    <finance-modal
      :is-visible="financeModalVisible"
      @on-close="closeFinanceModal"
      @on-save="saveFinancialDetail"
    />
    <cta-banner
      v-if="showCtaBanner"
      class="crop-details__cta-banner"
      :headline="'Do you want to save you changes?'"
      :description="'The crop details were changed. Do you want to save the change?'"
      :is-confirming="isConfirmingCta"
      @on-cancel="hideCtaBanner"
      @on-confirm="saveCrop"
    />
  </div>
</template>

<script>
import { isEmpty } from 'lodash'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCropStore } from '../store'
import { CROP_TYPES_LIST } from '../utils/crops'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import FinanceTable from '@/components/molecules/FinanceTable'
import FinanceModal from '@/components/molecules/FinanceModal'
import CropDetailsHeader from '../components/CropDetailsHeader'
import CtaBanner from '@/components/molecules/CtaBanner'

export default {
  name: 'CropDetails',
  components: {
    CtaBanner,
    CropDetailsHeader,
    Icon,
    Button,
    FinanceTable,
    FinanceModal
  },
  setup () {
    const route = useRoute()
    const cropStore = useCropStore()
    const selectedCrop = ref({})
    const financeModalVisible = ref(false)
    const showCtaBanner = ref(false)
    const isConfirmingCta = ref(false)
    const cropTypesList = ref(CROP_TYPES_LIST)

    /**
     * Computed value returns if crop has finance data
     * @type {ComputedRef<*>}
     */
    const hasFinanceData = computed(() => selectedCrop.value && selectedCrop.value.finance && selectedCrop.value.finance.length)

    /**
     * Computed check if selected crop has value
     * @type {ComputedRef<boolean>}
     */
    const isCropSelected = computed(() => !isEmpty(selectedCrop.value))

    /**
     * Function triggered to when close event emitted on finance model
     */
    const closeFinanceModal = () => {
      financeModalVisible.value = false
    }

    /**
     * Function triggered when add more finance button is clicked
     */
    const showFinanceModal = () => {
      financeModalVisible.value = true
    }

    /**
     * Function triggered when save financial is emitted
     * @param details
     */
    const saveFinancialDetail = async details => {
      financeModalVisible.value = false
      selectedCrop.value.finance.push({ ...details })
      showCtaBanner.value = true
    }

    /**
     * Function triggered when crop is changed
     * @param crop
     */
    const onCropChange = crop => {
      selectedCrop.value = crop
      showCtaBanner.value = true
    }

    /**
     * Function triggered when user click remove button on finance detail
     * @param id
     */
    const removeFinanceDetail = id => {
      selectedCrop.value.finance.splice(id, 1)
      showCtaBanner.value = true
    }

    /**
     * Function triggered when clicked on save in CTA banner
     */
    const saveCrop = async () => {
      isConfirmingCta.value = true
      await cropStore.updateCrop({ ...selectedCrop.value })
      hideCtaBanner()
    }

    /**
     * Function for hiding the CTA banner and setting loading icon hidden
     */
    const hideCtaBanner = () => {
      showCtaBanner.value = false
      isConfirmingCta.value = false
    }

    onMounted(async () => {
      selectedCrop.value = await cropStore.getCrop(route.params.id)
    })

    return {
      selectedCrop,
      financeModalVisible,
      showCtaBanner,
      isConfirmingCta,
      cropTypesList,
      hasFinanceData,
      isCropSelected,
      closeFinanceModal,
      showFinanceModal,
      saveFinancialDetail,
      onCropChange,
      removeFinanceDetail,
      saveCrop,
      hideCtaBanner
    }
  }
}
</script>

<style lang="scss" scoped>
.crop-details {
  padding: 40px;
  min-height: 100vh;
  background-color: #f5f6f8;
  &__finance-headline {
    display: flex;
    align-items: center;
    > * {
      margin-right: 20px;
    }
  }
  &__cta-banner {
    position: fixed;
    bottom: 30px;
    left: 50%;
    width: 96%;
    transform: translateX(-50%);
  }
  .back-link {
    display: flex;
    align-items: center;
    ::v-deep svg {
      margin-right: 5px;
    }
  }
}
.mt-20 {
  margin-top: 20px
}
.mt-50 {
  margin-top: 50px;
}
.mb-20 {
  margin-bottom: 20px;
}
.mb-100 {
  margin-bottom: 100px;
}
</style>
