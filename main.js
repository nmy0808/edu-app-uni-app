import App from './App'
import api from '@/http'
// import systemInfoMixin from '@/common/mixin/systemInfo.js'
// #ifndef VUE3
import Vue from 'vue'
import store from '@/store/index.js'
import { getRoute } from '@/common/js/utils.js'
import initMixin from '@/common/mixin/initMixin.js'
import tool from '@/common/js/tool.js'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$http = api
Vue.prototype.$getRoute = getRoute
Vue.prototype.$tool = tool
Vue.mixin(initMixin)


const app = new Vue({
	store,
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