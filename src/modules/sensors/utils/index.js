import mapboxgl from 'mapbox-gl'

export const SENSOR_TYPE_WIND = 'wind'
export const SENSOR_TYPE_HUMIDITY = 'humidity'
export const SENSOR_TYPE_FIRE = 'fire'
export const SENSOR_TYPE_TEMPERATURE = 'temperature'
export const SENSOR_TYPE_CO2 = 'co2'
export const SENSOR_TYPE_NOISE = 'noise'

export const sensorIcon = {}

sensorIcon[SENSOR_TYPE_WIND] = '💨'
sensorIcon[SENSOR_TYPE_HUMIDITY] = '💧'
sensorIcon[SENSOR_TYPE_FIRE] = '🔥'
sensorIcon[SENSOR_TYPE_TEMPERATURE] = '🌡️'
sensorIcon[SENSOR_TYPE_CO2] = '☢'
sensorIcon[SENSOR_TYPE_NOISE] = '🔊'

export const SENSOR_EMPTY_SCHEMA = {
  name: '',
  type: '',
  status: true,
  battery: null,
  unit: '',
  coordinates: {
    x: null,
    y: null
  }
}

export const SENSOR_SELECT_OPTIONS = [
  {
    value: SENSOR_TYPE_WIND,
    label: `${sensorIcon[SENSOR_TYPE_WIND]} Wind`
  },
  {
    value: SENSOR_TYPE_HUMIDITY,
    label: `${sensorIcon[SENSOR_TYPE_HUMIDITY]} Humidity`
  },
  {
    value: SENSOR_TYPE_FIRE,
    label: `${sensorIcon[SENSOR_TYPE_FIRE]} Fire`
  },
  {
    value: SENSOR_TYPE_TEMPERATURE,
    label: `${sensorIcon[SENSOR_TYPE_TEMPERATURE]} Temperature`
  },
  {
    value: SENSOR_TYPE_CO2,
    label: `${sensorIcon[SENSOR_TYPE_CO2]} CO2`
  },
  {
    value: SENSOR_TYPE_NOISE,
    label: `${sensorIcon[SENSOR_TYPE_NOISE]} Noise`
  }
]

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
