import { defineStore } from 'pinia'
import { db } from '@/firebase/db'
import SENSORS from './data'

export const useSensorStore = defineStore('sensor', {
  state: () => ({
    sensors: []
  }),
  actions: {

    /**
     * Function returns list of sensors
     * @returns {Promise<unknown>}
     */
    getSensors () {
      return new Promise((resolve, reject) => {
        resolve(SENSORS)
      })
    },

    /**
     * Function save the sensor into the db
     * @param sensor
     * @returns {Promise<unknown>}
     */
    saveSensor (sensor) {
      return new Promise((resolve, reject) => {
        db.collection('sensors')
          .doc(sensor.id)
          .update(sensor)
          .then(r => resolve(r))
          .catch(e => reject(e))
      })
    },

    /**
     * Function to add sensor into the db
     * @param sensor
     * @returns {Promise<unknown>}
     */
    addSensor (sensor) {
      return new Promise((resolve, reject) => {
        db.collection('sensors')
          .doc()
          .set(sensor)
          .then(r => resolve(r))
          .catch(e => reject(e))
      })
    }
  }
})
