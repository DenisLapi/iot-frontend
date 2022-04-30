import { defineStore } from 'pinia'
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
      db.collection('fields')
        .doc(field.id)
        .set(field).then(r => r)
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
          .then(querySnapshot => {
            resolve({ id: querySnapshot.id, ...querySnapshot.data() })
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
      db.collection('fields')
        .doc(id)
        .delete().then(r => r)
    }
  }
})
