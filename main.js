import App from './App'
import api from '@/http'
// import systemInfoMixin from '@/common/mixin/systemInfo.js'
// #ifndef VUE3
import Vue from 'vue'
import { getRoute } from '@/common/js/utils.js'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$http = api
Vue.prototype.$getRoute = getRoute
// Vue.mixin(systemInfoMixin)
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif