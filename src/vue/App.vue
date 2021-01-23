<template>
  <div id="app">
    <RemTable/>
  </div>
</template>

<script>
import RemTable from "./components/RemTable.vue"

export default {
  name: 'App',
  components: {
  RemTable
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
