import { defineStore } from 'pinia'
import { db } from '@/firebase/db'

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
      db.collection('crops')
        .get()
        .then(querySnapshot => {
          this.crops = querySnapshot.docs.map(doc => doc.data())
        })
    },

    /**
     * Function updates crop
     * @param crop crop details which needs to include crop id
     */
    updateCrop (crop) {
      db.collection('crops')
        .doc(crop.id)
        .set(crop).then(r => r)
    },

    /**
     * Function returns the crop based on the id
     * @param cropId
     * @returns {*} Crop
     */
    getCrop (cropId) {
      db.collection('crops')
        .doc(cropId)
        .get()
        .then(querySnapshot => {
          return querySnapshot.data()
        })
    },

    /**
     * Functions appends crop into the crops list
     * @param crop
     */
    addCrop (crop) {
      return new Promise((resolve, reject) => {
        db.collection('crops')
          .add(crop)
          .then(r => {
            return resolve(r)
          })
          .catch(e => reject(e))
      })
    },

    /**
     * Function deletes crop from the crops list
     * @param crop Crop object with id property
     */
    deleteCrop ({ id }) {
      db.collection('crops')
        .doc(id)
        .delete().then(r => r)
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
