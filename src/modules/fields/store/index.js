import { defineStore } from 'pinia'
import DEFAULT_FIELDS from './data'

export const useFieldStore = defineStore('field', {
  state: () => ({
    fields: []
  }),
  actions: {
    loadFields () {
      this.fields = DEFAULT_FIELDS
    },
    updateFields (fields) {
      this.fields = fields
    },
    updateField (field) {
      const fieldIndex = this.fields.findIndex(({ id }) => field.id === id)
      console.log(fieldIndex)
      this.fields[fieldIndex] = field
      console.log(this.fields)
    }
  }
})
