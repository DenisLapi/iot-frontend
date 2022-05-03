import mapboxgl from 'mapbox-gl'

export const SENSOR_TYPE_WIND = 'wind'
export const SENSOR_TYPE_HUMIDITY = 'humidity'
export const SENSOR_TYPE_FIRE = 'fire'
export const SENSOR_TYPE_TEMPERATURE = 'temperature'
export const SENSOR_TYPE_CO2 = 'co2'
export const SENSOR_TYPE_VOICE = 'voice'

export const sensorIcon = {}

sensorIcon[SENSOR_TYPE_WIND] = '💨'
sensorIcon[SENSOR_TYPE_HUMIDITY] = '💧'
sensorIcon[SENSOR_TYPE_FIRE] = '🔥'
sensorIcon[SENSOR_TYPE_TEMPERATURE] = '🌡️'
sensorIcon[SENSOR_TYPE_CO2] = '☢'
sensorIcon[SENSOR_TYPE_VOICE] = '🔊'

/**
 * Function add sensors to the map
 * @param map
 * @param sensors
 * @param onSensorsAdded Callback function called then all sensors are created
 * @param onSensorClick Callback function called when clicking on sensor
 */
export const addSensors = (map, sensors, onSensorsAdded, onSensorClick) => {
  const allSensors = []
  const features = sensors.map(sensor => createSensorFeature(sensor))
  const geojson = {
    type: 'FeatureCollection',
    features
  }

  for (const feature of geojson.features) {
    const el = document.createElement('div')
    el.classList.add('sensor-marker')
    el.addEventListener('click', _ => {
      onSensorClick(feature.properties.id)
    })
    el.innerHTML = `<span>${sensorIcon[feature.properties.type]}</span>`
    const sensor = new mapboxgl.Marker(el)
      .setLngLat(feature.geometry.coordinates)
      .addTo(map)
    allSensors.push(sensor)
  }

  onSensorsAdded(allSensors)
}

/**
 * Remove all sensors from the map
 * @param sensors
 */
export const removeAllSensors = sensors => {
  for (const sensor of sensors) {
    sensor.remove()
  }
}

/**
 * Create the Mapbox feather for sensor
 * @param id
 * @param type
 * @param x
 * @param y
 * @returns {{geometry: {coordinates: *[], type: string}, type: string, properties: {id}}}
 */
export const createSensorFeature = ({ id, type, coordinates: { x, y } }) => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [x, y]
    },
    properties: {
      id,
      type
    }
  }
}
