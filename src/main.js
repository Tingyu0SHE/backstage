import Vue from 'vue'
import App from './App.vue'
// 引入router配置文件
import VueRouter from 'vue-router'
import router from '@/router'
// 引入element UI
import ElementUI from 'element-ui';
// import { Button, FormItem, Form, Select, Option, Input } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/global.css"
// 引入store
import store  from './store';
// 引入axios
import axios from 'axios'
axios.defaults.baseURL ='http://106.15.3.117:8887'
// 引入echart
// import * as echarts from 'echarts';
// Vue.prototype.$echarts = echarts

Vue.prototype.$http=axios

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueRouter)
// Vue.use(Button)
// Vue.use(FormItem)
// Vue.use(Form)
// Vue.use(Select)
// Vue.use(Option)
// Vue.use(Input)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
