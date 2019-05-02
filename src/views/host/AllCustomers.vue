<template>
  <div class="allCustomers">
      <h1>You are an Host</h1>
    <h2>List of all Customers</h2>
      <ul v-for="booking of bookings" v-bind:key ="booking['.key']">
      Customer: {{booking.user}} <br /> 
      Date: {{booking.date}} <br /> 
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
  name: 'allCustomers',
   data () {
    return {
      bookings:[]
    }
   },
    created () {
        db.ref('allBookings').orderByChild("room/userID").equalTo(userID).once('value').then((snapshot) => {
        this.bookings = [];
        snapshot.forEach((doc) => {
          this.bookings.push(doc.val());
        }) 
      }).catch((error) => {
        console.log(error);
      });
    }
}
</script>
