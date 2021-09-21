import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import axios from "axios";
import store from "./store";
import VueSimplemde from 'vue-simplemde';
import md from 'marked';
import 'simplemde/dist/simplemde.min.css';
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

Vue.config.productionTip = false

Vue.prototype.$axios = axios;
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
axios.defaults.baseURL = process.env.VUE_APP_SERVER;
const token = localStorage.getItem('access_token');
const Token ='Bearer ' + token;

Vue.component('vue-simplemde', VueSimplemde);

window.md = md;
window.EventBus = new Vue();

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.VUE_APP_WEBSOCKETS_KEY,
  authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
  wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  auth: {
    headers: {
        Authorization: Token
    }
  }
});
window.Echo.connector.pusher.connection.bind('connected', function () {
  axios.defaults.headers.common['X-Socket-Id'] = window.Echo.socketId();
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
