import Vue from 'vue';

import firebase from 'firebase';
const VueFire = require('vuefire');
Vue.use(VueFire);
const config = {
  apiKey: 'AIzaSyA5ZGr1G4YxlYH47K6Ekdh_NrklcCa9E9Y',
  authDomain: 'cartaroom-3f36f.firebaseapp.com',
  databaseURL: 'https://cartaroom-3f36f.firebaseio.com',
  projectId: 'cartaroom-3f36f',
  storageBucket: 'cartaroom-3f36f.appspot.com',
  messagingSenderId: '292210465189'
};

let fb = firebase.initializeApp(config);
export default fb.database();


// Firebase rules:
// {
//   "rules": {
//     "users": {
//         ".read": true,
//         ".write": true
//     },
//   "rooms": {
//         ".read": true,
//         ".write": true
//     }
//   }
//  }