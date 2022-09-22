<<<<<<< HEAD
import Vue from "vue";
import App from "./App.vue";
import "./axios";
import router from "./router";
import store from "./store";
import "@/elementui";
import VDistpicker from "v-distpicker";

Vue.component("v-distpicker", VDistpicker);
require("./mock/warehouse_mock"); //文档引入
=======
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/elementui'
import '@/mock/mock' // 引入mock
>>>>>>> origin/feature-product

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
