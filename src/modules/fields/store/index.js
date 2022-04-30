import { defineStore } from 'pinia'
import { useCropStore } from '@/modules/crops/store'
import { db } from '@/firebase/db'

export const useFieldStore = defineStore('field', {
  state: () => ({
    fields: []
  }),
  actions: {

    /**
     * Function loads the fields in the store
     */
    loadFields () {
      db.collection('fields')
        .get()
        .then(querySnapshot => {
          this.fields = querySnapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data()
            }
          })
        })
    },

    /**
     * Function updates field
     * @param field field details which needs to include field id
     */
    updateField (field) {
      return new Promise((resolve, reject) => {
        const { crops } = field
        delete field.crops
        db.collection('fields')
          .doc(field.id)
          .update(field).then(async r => {
            if (crops.length) {
              const cropStore = useCropStore()
              for (let i = 0; i < crops.length; i++) {
                await cropStore.updateCrop(crops[i])
              }
              resolve(r)
            }
          })
          .catch(e => reject(e))
      })
    },

    /**
     * Function returns the field based on the id
     * @param fieldId
     * @returns {*} Field
     */
    async getField (fieldId) {
      return new Promise((resolve, reject) => {
        db.collection('fields')
          .doc(fieldId)
          .get()
          .then(async querySnapshot => {
            const crops = await this.getFieldCrops(fieldId)
            resolve({ id: querySnapshot.id, ...querySnapshot.data(), crops })
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    async getFieldCrops (fieldId) {
      return new Promise((resolve, reject) => {
        console.log('get field crops')
        db.collection('crops')
          .where('fieldId', '==', fieldId)
          .get()
          .then(querySnapshot => {
            resolve(querySnapshot.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data()
              }
            }))
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    /**
     * Functions appends field into the fields list
     * @param field
     */
    addField (field) {
      return new Promise((resolve, reject) => {
        db.collection('fields')
          .add(field)
          .then(r => {
            resolve(r)
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    /**
     * Function deletes field from the field list
     * @param field Field object with id property
     */
    deleteField ({ id }) {
      return new Promise((resolve, reject) => {
        db.collection('fields')
          .doc(id)
          .delete()
          .then(r => resolve(r))
          .catch(e => reject(e))
      })
    }
  }
})
