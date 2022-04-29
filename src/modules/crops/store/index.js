import { defineStore } from 'pinia'
import DEFAULT_CROPS from './data'

export const useCropStore = defineStore('crop', {
  state: () => ({
    crops: [],
    selectedCrop: null
  }),
  actions: {

    /**
     * Function loads the crops in the store
     */
    loadCrops () {
      this.crops = DEFAULT_CROPS
    },

    /**
     * Function updates crop
     * @param crop crop details which needs to include crop id
     */
    updateCrop (crop) {
      const index = this.crops.findIndex(({ id }) => crop.id === id)
      this.crop[index] = crop
    },

    /**
     * Function returns the crop based on the id
     * @param cropId
     * @returns {*} Crop
     */
    getCrop (cropId) {
      const index = DEFAULT_CROPS.findIndex(({ id }) => cropId === id)
      return DEFAULT_CROPS[index]
    },

    /**
     * Functions appends crop into the crops list
     * @param crop
     */
    addCrop (crop) {
      this.crop.push(crop)
    },

    /**
     * Function deletes crop from the crops list
     * @param crop Crop object with id property
     */
    deleteCrop (crop) {
      const index = this.crops.findIndex(({ id }) => crop.id === id)
      this.crop.splice(index, 1)
    },

    /**
     * Function loads the view crop state variable
     * @param cropId
     */
    selectCrop (cropId) {
      this.selectedCrop = this.getCrop(cropId)
    }
  }
})
