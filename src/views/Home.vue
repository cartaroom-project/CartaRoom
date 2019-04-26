<template>
  <div class="home">
      <h1>List of users</h1>
    <ul>
      <p>testing</p>
      <li v-for="userEmail of users" v-bind:key ="userEmail['.key']">{{userEmail.email}}</li>
    </ul>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase.js';
db.ref('users').once('value').then(function(snapshot) {
  console.log(snapshot.val());
}).catch((error) => {
  console.log(error);
});
export default {

  name: 'home',
   data () {
    return {
      users:[]
    }
   },
    created () {
      db.ref('users').once('value').then((snapshot) => {
        this.users = [];
        snapshot.forEach((doc) => {
          this.users.push(doc.val());
        }) 
      }).catch((error) => {
        console.log(error);
      });
    },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>
