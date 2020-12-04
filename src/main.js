import Vue from 'vue'
import App from './App.vue'
import router from './routers';

import 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

  