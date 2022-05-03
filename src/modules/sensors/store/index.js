import { defineStore } from 'pinia'
import { db } from '@/firebase/db'
import SENSORS from './data'

export const useSensorStore = defineStore('sensor', {
  state: () => ({
    sensors: []
  }),
  actions: {
    getSensors () {
      return new Promise((resolve, reject) => {
        resolve(SENSORS)
      })
    }
  }
})
