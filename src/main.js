import Vue from 'vue'
import App from './App.vue'
import "./axios";
import router from './router'
import store from './store'
import '@/elementui'

require('./mock/warehouse_mock') //文档引入

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
