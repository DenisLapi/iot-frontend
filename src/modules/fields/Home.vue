<template>
  <Map
    access-token="pk.eyJ1IjoiZGVuaXNsYXBpIiwiYSI6ImNqemdyMGhuZTBtOWIzY2xudHJ1eHIyZHQifQ.gFiU6KI16bIPjK6raEJvbQ"
    container="map"
    :zoom="5"
    class="map"
   />
</template>

<script>
import Map from './components/Map'

export default {
  name: 'Home',
  components: {
    Map
  }
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 100vh;
}
</style>
