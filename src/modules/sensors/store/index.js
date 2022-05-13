import { defineStore } from 'pinia'
import { db } from '@/firebase/db'

export const useSensorStore = defineStore('sensor', {
  state: () => ({
    sensors: [] // Store live updates of sensors
  }),
  actions: {

    /**
     * Function returns list of sensors
     * @returns {Promise<unknown>}
     */
    getSensors () {
      return new Promise((resolve, reject) => {
        db.collection('sensors')
          .get()
          .then(querySnapshot => {
            const sensors = querySnapshot.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data()
              }
            })
            resolve(sensors)
          })
          .catch(e => reject(e))
      })
    },

    /**
     * Function returns the sensor based on the id
     * @param sensorId
     * @returns {*} Field
     */
    async getSensor (sensorId) {
      return new Promise((resolve, reject) => {
        db.collection('sensors')
          .doc(sensorId)
          .get()
          .then(async querySnapshot => {
            resolve({ id: querySnapshot.id, ...querySnapshot.data() })
          })
          .catch(e => {
            reject(e)
          })
      })
    },

    /**
     * Function updates the sensor into the db
     * @param sensor
     * @returns {Promise<unknown>}
     */
    updateSensor (sensor) {
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
    },

    /**
     * Function deletes sensor
     * @param sensor Sensor object with id property
     */
    deleteSensor ({ id }) {
      return new Promise((resolve, reject) => {
        db.collection('sensors')
          .doc(id)
          .delete()
          .then(r => resolve(r))
          .catch(e => reject(e))
      })
    },

    /**
     * Function which triggers live updates for sensors and stores in the store
     */
    triggerLiveUpdates () {
      db.collection('sensors')
        .onSnapshot(snapshot => {
          this.sensors = snapshot.docs.map(doc => doc.data())
        })
    }
  }
})
