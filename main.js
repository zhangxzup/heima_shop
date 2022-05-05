import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import {
  myRequest
} from "./utils/request.js"
Vue.config.productionTip = false
Vue.prototype.$myRequest = myRequest;
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import {
  myRequest
} from "@/utils/request.js"
app.config.globalPropoties.$myRequest = myRequest;
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
