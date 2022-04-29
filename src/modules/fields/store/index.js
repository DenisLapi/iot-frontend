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
          this.fields = querySnapshot.docs.map(doc => doc.data())
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
    getField (fieldId) {
      db.collection('fields')
        .doc(fieldId)
        .get()
        .then(querySnapshot => {
          return querySnapshot.data()
        })
    },

    /**
     * Functions appends field into the fields list
     * @param field
     */
    addField (field) {
      db.collection('fields')
        .add(field).then(r => r)
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
