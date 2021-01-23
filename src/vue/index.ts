import Vue from 'vue'
import App from './App.vue'
import VueTabulator from "vue-tabulator"

Vue.config.productionTip = false
Vue.use(VueTabulator)

new Vue({
  render: h => h(App),
}).$mount('#app')
