<template>
  <div id="app">
    <div id="nav">
      <!-- renders view after logged in -->
      <router-link to="/home">View All Rooms[host]</router-link> |
      <router-link to="/addRoom">Host a new Room[host]</router-link> |
      <router-link to="/currentBookings">Current Bookings[host]</router-link> |
      <router-link to="/allBookings">All Bookings[host]</router-link> |
      <router-link to="/allCustomers">Customer Database[host]</router-link> <br /> 
      <router-link to="/search">Search[Patron]</router-link> |
      <router-link to="/currentBookingsPatron">Current Bookings[patron]</router-link> |
      <router-link to="/allBookingsPatron">All Bookings[patron]</router-link> <br /> 
      <button @click="logout">Logout</button>
      <router-view></router-view>
    </div>
    
  </div>
</template>


<script>
import firebase from 'firebase';
import db from '@/firebase.js';

// db.ref('rooms').once('value').then(function(snapshot) {
//   console.log(snapshot.val());
// }).catch((error) => {
//   console.log(error);
// });

  var userID;
  firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
   // console.log(user.uid); //a@a.com = gbEw7s5ic1drxG3vgFWD3DAMb972
    userID = user.uid;
  } else {
   // console.log("No user available"); 
    userID = "null";
  }
});

export default {
  name: 'home',
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
