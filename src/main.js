import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//用自己封装好的axios.js
//import axios from 'axios'
import axios from './axios.js'

Vue.prototype.$axios=axios
Vue.config.productionTip = false
Vue.use(element)
require("./mock.js")
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
