import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import 'normalize.css'

Vue.config.productionTip = false
Vue.use(axios)

new Vue({
  render: h => h(App)
}).$mount('#app')
