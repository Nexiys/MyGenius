import Vue from 'vue'         // 引入 Vue 框架，来自 node_modules
import App from './App.vue'              // 引入 App.vue 组件 （根组件 src/App.vue）
import router from './router'            // 引入路由 （src/router）
import store from './store'              // 引入 store 资源 （src/store）               // 引入 axios 插件
import VueAxios from 'vue-axios'         // 引入 vue-axios Vue 集成的 axios 作用方法
import axios from 'axios'
import { Loading } from 'element-ui'
import echarts from 'echarts'
import jsPlumb from 'jsplumb'

import '@/assets/js/flexible.js'   	     //  可视窗口适配方法
import '@/assets/style/base.css'   	     //  初始化样式文件
import '@/assets/style/iconFont.css'     //  引入字体图标样式
import '@/assets/css/theme/index.css'

Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$jsPlumb = jsPlumb.jsPlumb

Vue.use(Loading)

new Vue({
  router,
  store,
  VueAxios,
  axios,
  render: h => h(App)
}).$mount('#app')

// Vue.use(store).use(router).use(VueAxios,axios).$mount('#app')

router.beforeEach((to, from, next)=>{
  // 路由中设置的 needLogin 字段就在 to 当中
  if(window.localStorage.data){
    if(to.path === '/login' || to.path === '/Login' ){
      // 登录状态下
      next({path: '/Guide'});
    }else{
      next();
    }
  }else{
    // 如果没有 session
    if (to.path === '/login' ||to.path === '/Login') { 
      next();
			// 否则 跳转到登录页面
    } else { 
      next({ path: '/Login' });
    }
  }
})

// axios.interceptors.request.use(
//   config => {
//     if (window.localStorage.data) {
//       config.headers.Authorization = window.localStorage.data;
//     }
//     return config;
    
//   },
//   error => {
//     return Promise.reject(error);
//   });