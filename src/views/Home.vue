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
      <button v-on:click="deleteRoom(room.uniqueKey)">Delete Room</button>
      <br /></ul>
    </ul>
    <h2>List of All Bookings</h2>
      <ul v-for="booking of bookings" v-bind:key ="booking['.key']">
      Room Name: {{booking.room.name}} <br />
      Booker: {{booking.user}} <br /> 
      <button v-on:click="unbookRoom(booking, booking.room.uniqueID)">Remove Booking</button> <br /> 
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
      bookings:[],
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

        db.ref('bookings').orderByChild("room/userID").equalTo(userID).once('value').then((snapshot) => {
        this.bookings = [];
        snapshot.forEach((doc) => {
          this.bookings.push(doc.val());
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
    unbookRoom: function(booking) {
        firebase.database().ref('rooms/' + booking.room.uniqueKey).update({userID: booking.room.userID, name: booking.room.name, capacity: booking.room.capacity, description: booking.room.description, address: booking.room.address, uniqueKey: booking.room.uniqueKey, reserved: 'false'})
        db.ref('bookings').child(booking.bookingID).remove();
        alert('Room Status has been reset');
        this.$router.go();
    }
  }
}
</script>
