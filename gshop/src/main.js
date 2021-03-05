import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button } from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import './filters' // 过滤器
import './mock/mockServer'
import loading from './common/imgs/loading.jpg'
Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  loading
})
// 注册全局组件
Vue.component(Button.name, Button) // <mt-button>
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 使用vue-router
  render: h => h(App),
  store // 使用vuex
})
