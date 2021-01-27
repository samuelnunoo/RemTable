import Vue from 'vue'
import App from './App.vue'
import VueTabulator from "vue-tabulator"
import vuetify from "../plugins/vuetify"
import store from "./store/index"

Vue.config.productionTip = false
Vue.use(VueTabulator)


new Vue({
  vuetify,
  store,
  render: h => h(App),

}).$mount('#app')
