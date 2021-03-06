import Vue from 'vue'
import App from './App.vue'
import router from './routers/index'
import store from './store'
Vue.config.productionTip = false



/* ui */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

/* style */
import './common/css/reset.css'
import './common/css/common.less'

Vue.use(ElementUI)

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')