import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

let app = '';
const config = {
  apiKey: 'AIzaSyA5ZGr1G4YxlYH47K6Ekdh_NrklcCa9E9Y',
  authDomain: 'cartaroom-3f36f.firebaseapp.com',
  databaseURL: 'https://cartaroom-3f36f.firebaseio.com',
  projectId: 'cartaroom-3f36f',
  storageBucket: 'cartaroom-3f36f.appspot.com',
  messagingSenderId: '292210465189'
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
