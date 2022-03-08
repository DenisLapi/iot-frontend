/**
 * Create fields on a map source
 * @param fields Array of fields
 * @param map MapBox map object
 * @param source Source name
 */
export const createFields = (fields, map, source) => {
  const coordinates = fields.map(field => [formatCoordinates(field)])
  map.addSource(source, {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates
      }
    }
  })
  map.addLayer({
    id: 'field',
    type: 'fill',
    source,
    layout: {},
    paint: {
      'fill-color': '#dedede',
      'fill-opacity': 0.8
    }
  })
  map.addLayer({
    id: 'outline',
    type: 'line',
    source,
    layout: {},
    paint: {
      'line-color': '#000',
      'line-width': 2
    }
  })
}

/**
 * Format the Field coordinates to match the Mapbox source format
 * @param Field
 * @returns {Array} Returns array of arrays with x and y coordinates
 */
export const formatCoordinates = ({ coordinates }) => {
  return coordinates.map(coordinate => {
    return [coordinate.x, coordinate.y]
  })
}
