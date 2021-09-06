import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import axios from "axios";
import store from "./store";
import VueSimplemde from 'vue-simplemde';
import md from 'marked';
import 'simplemde/dist/simplemde.min.css';

Vue.config.productionTip = false

Vue.prototype.$axios = axios;
axios.defaults.baseURL = process.env.VUE_APP_SERVER;
const token = localStorage.getItem('access_token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
Vue.component('vue-simplemde', VueSimplemde);

window.md = md;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
