<template>
  <div class="currentBookings">
      <h1>You are an Host</h1>
    <h2>List of Current Bookings</h2>
      <ul v-for="booking of bookings" v-bind:key ="booking['.key']">
      Room Name: {{booking.room.name}} <br />
      Booker: {{booking.user}} <br /> 
      Date: {{booking.date}} <br /> 
      Start Time: {{booking.startTime}} <br /> 
      End Time: {{booking.endTime}} <br /> 
      <button v-on:click="unbookRoom(booking, booking.room.uniqueID)">Remove Booking</button> <br /> 
      </ul>
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
  name: 'currentBookings',
   data () {
    return {
      bookings:[]
    }
   },
    created () {
        db.ref('currentBookings').orderByChild("room/userID").equalTo(userID).once('value').then((snapshot) => {
        this.bookings = [];
        snapshot.forEach((doc) => {
          this.bookings.push(doc.val());
        }) 
      }).catch((error) => {
        console.log(error);
      });
    },
  methods: {
    unbookRoom: function(booking) {
        firebase.database().ref('rooms/' + booking.room.uniqueKey).update({userID: booking.room.userID, name: booking.room.name, capacity: booking.room.capacity, description: booking.room.description, address: booking.room.address, uniqueKey: booking.room.uniqueKey, reserved: 'false'})
        db.ref('currentBookings').child(booking.bookingID).remove();
        alert('Room Status has been reset');
        this.$router.go();
    }
  }
}
</script>
