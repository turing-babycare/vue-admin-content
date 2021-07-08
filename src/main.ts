import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import _ from 'lodash'
import 'ant-design-vue/dist/antd.css'
Vue.prototype._ = _

Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
