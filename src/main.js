import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
// 导入二次封装的 axios
import axios from "./api/request"
Vue.prototype.$axios = axios

// 导入路由表
import router from "./router"
// 使用路由
Vue.use(VueRouter)

// 导入 element-ui 和 它的样式库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 使用 element-ui
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router, // 注册路由表
  beforeCreate() {
    // 挂载全局事件总线
    Vue.prototype.$bus = this
  },
}).$mount('#app')
