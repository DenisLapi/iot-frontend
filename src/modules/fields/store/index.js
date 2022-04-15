import { defineStore } from 'pinia'
import DEFAULT_FIELDS from './data'

export const useFieldStore = defineStore('field', {
  state: () => ({
    fields: []
  }),
  actions: {

    /**
     * Function loads the fields in the store
     */
    loadFields () {
      this.fields = DEFAULT_FIELDS
    },

    /**
     * Function updates field
     * @param field field details which needs to include field id
     */
    updateField (field) {
      const fieldIndex = this.fields.findIndex(({ id }) => field.id === id)
      this.fields[fieldIndex] = field
    },

    /**
     * Function returns the field based on the id
     * @param fieldId
     * @returns {*} Field
     */
    getField (fieldId) {
      const fieldIndex = this.fields.findIndex(({ id }) => fieldId === id)
      return this.fields[fieldIndex]
    },

    /**
     * Functions appends field into the fields list
     * @param field
     */
    addField (field) {
      this.fields.push(field)
    }
  }
})
