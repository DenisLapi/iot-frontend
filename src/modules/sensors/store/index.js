import { defineStore } from 'pinia'
import { db } from '@/firebase/db'

export const useSensorStore = defineStore('sensor', {
  state: () => ({
    sensors: []
  }),
  actions: {}
})
