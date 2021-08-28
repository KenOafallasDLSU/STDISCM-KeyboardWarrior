import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VModal from 'vue-js-modal'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VModal);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount('#app');
