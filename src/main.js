/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-03-03 01:22:06
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-03-03 21:35:34
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import axios from 'axios'
Vue.prototype.$axios = axios

Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
