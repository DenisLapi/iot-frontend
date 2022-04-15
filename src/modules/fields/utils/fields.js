export const FIELD_COLOR = '#ffffff'
export const FIELD_COLOR_OPACITY = 0.2
export const FIELD_BORDER_WIDTH = 3

/**
 * Create fields on a map source
 * @param fields array of fields
 * @param map mapbox map object
 * @param source source name
 * @param fieldsLayer name of the layer for fields
 * @param fieldClickedCB callback fired when field is clicked
 */
export const createFields = (
  fields,
  map,
  source,
  fieldsLayer = 'fields-layer',
  fieldClickedCB = () => {}
) => {
  const features = fields.map(field => createFieldFeature(field))
  map.addSource(source, {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features
    }
  })
  map.addLayer({
    id: fieldsLayer,
    type: 'fill',
    source,
    layout: {},
    paint: {
      'fill-color': FIELD_COLOR,
      'fill-opacity': FIELD_COLOR_OPACITY
    }
  })
  map.addLayer({
    id: 'fields-outline',
    type: 'line',
    source,
    layout: {},
    paint: {
      'line-color': FIELD_COLOR,
      'line-width': FIELD_BORDER_WIDTH
    }
  })

  if (fieldClickedCB && typeof fieldClickedCB === 'function') {
    map.on('click', fieldsLayer, e => {
      return fieldClickedCB(e.features[0].properties.id)
    })
  }
}

/**
 * Format the field coordinates to match the mapbox source format
 * @param field
 * @returns {Array} returns array of arrays with x and y coordinates
 */
export const formatCoordinates = ({ coordinates }) => {
  return coordinates.map(({ x, y }) => {
    return [x, y]
  })
}

/**
 * Creates mapbox feature for one field
 * @param field
 * @returns {{geometry: {coordinates: Array[], type: string}, type: string}}
 */
export const createFieldFeature = (field) => {
  return {
    type: 'Feature',
    properties: {
      id: field.id
    },
    geometry: {
      type: 'Polygon',
      coordinates: [formatCoordinates(field)]
    }
  }
}

/**
 * Update the fields on existing map and source
 * @param fields list of fields
 * @param map mapbox map object
 * @param source source name as string
 */
export const updateFields = (fields, map, source) => {
  const features = fields.map(field => createFieldFeature(field))
  map.getSource(source).setData({
    type: 'FeatureCollection',
    features: [...features]
  })
}
