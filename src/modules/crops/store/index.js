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
      return new Promise((resolve, reject) => {
        db.collection('crops')
          .doc(crop.id)
          .update(crop)
          .then(r => resolve(r))
          .catch(e => reject(e))
      })
    },

    /**
     * Batch update or create crops
     * @param crops Crops array
     */
    async batchUpdateOrCreate (crops) {
      return new Promise((resolve, reject) => {
        const batch = db.batch()
        for (let i = 0; i < crops.length; i++) {
          if (crops[i].id) {
            const updateCropRef = db.collection('crops').doc(crops[i].id)
            batch.update(updateCropRef, { ...crops[i] })
          } else {
            const newCropRef = db.collection('crops').doc()
            batch.set(newCropRef, crops[i])
          }
        }
        batch
          .commit()
          .then(r => resolve(r))
          .catch(e => reject(e))
      })
    },

    /**
     * Function returns the crop based on the id
     * @param cropId
     * @returns {*} Crop
     */
    getCrop (cropId) {
      return new Promise((resolve, reject) => {
        db.collection('crops')
          .doc(cropId)
          .get()
          .then(querySnapshot => {
            const crop = { id: cropId, ...querySnapshot.data() }
            if (!crop.finance) {
              crop.finance = []
            }
            resolve(crop)
          })
          .catch(e => {
            reject(e)
          })
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
      return new Promise((resolve, reject) => {
        db.collection('crops')
          .doc(id)
          .delete()
          .then(r => resolve(r))
          .catch(e => reject(e))
      })
    },

    /**
     * Function loads the view crop state variable
     * @param cropId
     */
    async selectCrop (cropId) {
      this.selectedCrop = await this.getCrop(cropId)
    }
  }
})
