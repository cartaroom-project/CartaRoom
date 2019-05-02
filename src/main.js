import Vue from 'vue';
import firebase from 'firebase';
import VeeValidate from 'vee-validate';
import App from './App.vue'; //Navbar for non-logged in user
import App1 from './App1.vue'; //Navbar for logged in user
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(VeeValidate);

let app;
//export default firebase.database();

firebase.auth().onAuthStateChanged(() => {
  if (firebase.auth().currentUser) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App1)
    }).$mount('#app');
  }
  else{
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});

axios.defaults.baseURL = 'https://cartaroom-3f36f.firebaseio.com/'
axios.defaults.headers.common['Authorization'] = 'email'
axios.defaults.headers.get['Accepts'] = 'application/json'
