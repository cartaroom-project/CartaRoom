import Vue from 'vue';
import firebase from 'firebase';
import VeeValidate from 'vee-validate';
import App from './App.vue'; //Navbar for non-logged in user
import App1 from './App1.vue'; //Navbar for logged in user[Host]
import App2 from './App2.vue'; //Navbar for logged in user[Patron]
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(VeeValidate);

let app;
//export default firebase.database();

firebase.auth().onAuthStateChanged(() => {
  if(firebase.auth().currentUser){
  firebase.auth().currentUser.getIdTokenResult()
  .then((idTokenResult) => {
    //console.log(idTokenResult)
    // Confirm the user is an Host or Patron.
    if (idTokenResult.claims.host) {
      app = new Vue({
        router,
        render: h => h(App1)
      }).$mount('#app');
    } else if (idTokenResult.claims.patron) {
      app = new Vue({
        router,
        render: h => h(App2)
      }).$mount('#app');
    }
  })
}else{
  app = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
}
});

axios.defaults.baseURL = 'https://cartaroom-3f36f.firebaseio.com/'
axios.defaults.headers.common['Authorization'] = 'email'
axios.defaults.headers.get['Accepts'] = 'application/json'
