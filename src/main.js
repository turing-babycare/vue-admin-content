import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
// import _ from 'lodash'

Viewer.setDefaults({
  defaultOptions: {
    zIndex: 9999
  },
  Options: {
    inline: true,
    button: true,
    navbar: true,
    title: true,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    url: 'data-source'
  }
})
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)
new Vue({
  el: '#app',
  render: (h) => h(App)
})
