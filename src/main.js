import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'; 
import './assets/global.css'
import request from '@/utils/request'
import store from './store/index'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.request=request

new Vue({
  router,
  store,//定义成全局变量
  render: h => h(App)
}).$mount('#app')
