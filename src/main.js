import Vue from 'vue';
import firebase from 'firebase';
import VeeValidate from 'vee-validate';
import App from './index.vue'; //Navbar for non-logged in user
import App1 from './hostIndex.vue'; //Navbar for logged in user[Host]
import App2 from './patronIndex.vue'; //Navbar for logged in user[Patron]
import router from './router';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

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

