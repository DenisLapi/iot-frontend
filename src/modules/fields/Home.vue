<template>
  <div>
    <button @click="addField()">Click</button>
    <fields-map
      :fields="fields"
      @field-clicked="fieldClicked"
    />
    <field-details-modal
      :if="shouldDisplayFieldModal"
      :field="selectedField"
      :is-visible="showFieldModal"
      @on-close="closeFieldModal"
      @on-change="updateField"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useFieldStore } from './store'
import FieldsMap from './components/FieldsMap'
import FieldDetailsModal from './components/FieldDetailsModal'

export default {
  name: 'Home',
  components: {
    FieldsMap,
    FieldDetailsModal
  },
  setup () {
    const fieldStore = useFieldStore()
    const { fields } = storeToRefs(fieldStore)
    const selectedField = ref({})
    const showFieldModal = ref(false)
    const shouldDisplayFieldModal = computed(() => !!selectedField.value && showFieldModal.value)

    /**
     * Callback function triggered when field on the map is clicked
     * @param fieldId
     */
    const fieldClicked = fieldId => {
      selectedField.value = fieldStore.getField(fieldId)
      showFieldModal.value = true
    }

    const closeFieldModal = () => {
      showFieldModal.value = false
    }

    /**
     * Function is triggered when field value is changed
     * @param field
     */
    const updateField = field => {
      fieldStore.updateField(field)
    }

    const addField = _ => {
      const field = {
        id: 857521684,
        title: 'Field 7',
        size: '30 ha',
        company: {
          id: 0,
          name: 'Agro group'
        },
        manager: {
          id: 2,
          name: 'Tobias Smith'
        },
        coordinates: [
          {
            x: 22.598577,
            y: 44.411865
          },
          {
            x: 22.597117,
            y: 44.412478
          },
          {
            x: 22.601323,
            y: 44.418057
          },
          {
            x: 22.602267,
            y: 44.417689
          },
          {
            x: 22.605186,
            y: 44.417322
          },
          {
            x: 22.607374,
            y: 44.416525
          },
          {
            x: 22.608061,
            y: 44.41677
          },
          {
            x: 22.612824,
            y: 44.415697
          },
          {
            x: 22.616515,
            y: 44.414471
          },
          {
            x: 22.615271,
            y: 44.412662
          },
          {
            x: 22.611794,
            y: 44.407573
          },
          {
            x: 22.602696,
            y: 44.410547
          },
          {
            x: 22.598577,
            y: 44.411865
          }
        ],
        crops: [
          {
            id: 57412,
            planting_date: '01-02-2022',
            harvest_date: '05-09-2022',
            name: 'Sunflower',
            yield: '15 t/ha'
          }
        ],
        sensors: [
          {
            name: 'Wind sensor',
            type: 'wind',
            status: true,
            battery: 41,
            current: {
              value: 32,
              unit: 'm/s'
            },
            coordinates: {
              x: 22.638745,
              y: 44.423574
            }
          },
          {
            name: 'Humidity sensor',
            type: 'humidity',
            status: false,
            battery: 20,
            current: {
              value: 70,
              unit: '%'
            },
            coordinates: {
              x: 22.638745,
              y: 44.423574
            }
          }
        ],
        notes: [
          {
            id: 298,
            type: 'flooding',
            message: 'Tomorrow add some water',
            createdDate: '06-03-2022'
          },
          {
            id: 298,
            type: 'fire',
            message: 'Fire was detected',
            createdDate: '12-05-2022'
          }
        ]
      }
      fieldStore.addField(field)
    }

    onMounted(_ => {
      fieldStore.loadFields()
    })

    return {
      fields,
      selectedField,
      showFieldModal,
      shouldDisplayFieldModal,
      fieldClicked,
      closeFieldModal,
      updateField,
      addField
    }
  }
}
</script>
