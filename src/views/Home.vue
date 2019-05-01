<template>
  <div class="home">
    <ul>
      <h1>You are an Host</h1>
      <h2>List of All rooms</h2>
      <router-link to="/addRoom">Host a new Room<br /><br /></router-link>
      <ul v-for="room of rooms" v-bind:key ="room['.key']">
      Name: {{room.name}} <br />
      Capacity: {{room.capacity}} <br /> 
      Address: {{room.address}} <br /> 
      Reserved: {{room.reserved}} <button v-on:click="unbookRoom(room)">Reset Reservation Status</button> <br /> 
      <button v-on:click="deleteRoom(room.uniqueKey)">Delete Room</button>
      <br /></ul>
    </ul>
    <button @click="logout">Logout</button>
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
   data () {
    return {
      users:[],
      rooms: []
    }
   },
    created () {
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
    },
      deleteRoom: function(id) {
        console.log('unique ID ' + id);
        db.ref('rooms').child(id).remove();
        alert('Room Deleted!');
        this.$router.go();
    },
    unbookRoom: function(room) {
        firebase.database().ref('rooms/' + room.uniqueKey).update({userID: room.userID, name: room.name, capacity: room.capacity, description: room.description, address: room.address, uniqueKey: room.uniqueKey, reserved: 'false'})
        alert('Room Status has been reset');
        this.$router.go();
    }
  }
}
</script>
