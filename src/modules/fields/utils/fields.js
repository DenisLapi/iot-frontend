import MapboxDraw from '@mapbox/mapbox-gl-draw'

export const FIELD_COLOR = '#ffffff'
export const FIELD_COLOR_OPACITY = 0.2
export const FIELD_BORDER_WIDTH = 3

export const MAP_MODE_SELECT = 'select'
export const MAP_MODE_CREATE = 'create'

/**
 * Create fields on a map source
 * @param fields array of fields
 * @param map mapbox map object
 * @param source source name
 * @param fieldsLayer name of the layer for fields
 */
export const createFields = (
  fields,
  map,
  source = 'fields-map',
  fieldsLayer = 'fields-layer'
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
 * Format the field coordinates from array to objects
 * @param coordinates array
 */
export const formatCoordinatesToObject = coordinates => {
  return coordinates.map(coords => {
    return { x: coords[0], y: coords[1] }
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

export const getMapboxDraw = _ => {
  return new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true
    },
    defaultMode: 'draw_polygon'
  })
}
