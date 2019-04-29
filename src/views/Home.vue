<template>
  <div class="home">
    <ul>
      <h1>You are an Admin</h1>
      <h2>List of users</h2>
      <li v-for="userEmail of users" v-bind:key ="userEmail['.key']">{{userEmail.email}}</li>
      <h2>List of All rooms</h2>
      <router-link to="/addRoom">Host a new Room</router-link>
      <li v-for="room of rooms" v-bind:key ="room['.key']">{{room.name}}</li>
    </ul>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase.js';

db.ref('rooms').once('value').then(function(snapshot) {
  console.log(snapshot.val());
}).catch((error) => {
  console.log(error);
});

  var userID;
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user.uid); //a@a.com = gbEw7s5ic1drxG3vgFWD3DAMb972
    userID = user.uid;
  } else {
    console.log("No user available"); 
    userID = "null";
  }
});

export default {
  name: 'home',
   data () {
    return {
      users:[],
      rooms: []
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

        db.ref('rooms').orderByChild("userID").equalTo(userID).once('value').then((snapshot) => {
        this.rooms = [];
        snapshot.forEach((doc) => {
          this.rooms.push(doc.val());
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
