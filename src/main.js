import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false;

let app;
//export default firebase.database();

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});

axios.defaults.baseURL = 'https://cartaroom-3f36f.firebaseio.com/'
axios.defaults.headers.common['Authorization'] = 'email'
axios.defaults.headers.get['Accepts'] = 'application/json'
