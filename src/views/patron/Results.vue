<template>
  <div class="results">
    <ul>
      <h2>Search Results<br /><br /> </h2>
      Date: <input type="date" v-model="date"><br /> <br /> 
      Start Time: <input type="time" v-model="startTime"><br /> 
      End Time: <input type="time" v-model="endTime"><br /> <br /> 

      <ul v-for="room of rooms" v-bind:key ="room['.key']">
        Name: {{room.name}} <br />
        Capacity: {{room.capacity}} <br />
        Address: {{room.address}} <br /> 
        Reserved: {{room.reserved}} <br /> 
        <button v-on:click="bookRoom(room)">Book Room</button> <br />
      </ul>
      <router-link to="/search">Back to Search</router-link>
    </ul>
    <Recommended></Recommended>
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
export default {
  name: 'results',
   data () {
    return {
      rooms: [],
      startTime: '',
      endTime: '',
      date: ''
    }
   },
    created () {
        db.ref('rooms').once('value').then((snapshot) => {
        this.rooms = [];
        snapshot.forEach((doc) => {
          this.rooms.push(doc.val());
        }) 
      }).catch((error) => {
        console.log(error);
      });
    },
  methods: {
     bookRoom: function(room) {
        var userInfo = firebase.auth().currentUser.email;
        var uniqueKeyIDBooking = '1';

        console.log(room)
        console.log('Start Time: ' + this.startTime)

        firebase.database().ref('rooms/' + room.uniqueKey).update({userID: room.userID, name: room.name, capacity: room.capacity, description: room.description, address: room.address, uniqueKey: room.uniqueKey, reserved: 'true'})
        uniqueKeyIDBooking = firebase.database().ref('currentBookings').push({room: room, user: userInfo, bookingID: '1',startTime: this.startTime,endTime: this.endTime,date: this.date})
        firebase.database().ref('currentBookings/' + uniqueKeyIDBooking.key).update({room: room, user: userInfo, bookingID: uniqueKeyIDBooking.key,startTime: this.startTime,endTime: this.endTime,date: this.date})

        uniqueKeyIDBooking = firebase.database().ref('allBookings').push({room: room, user: userInfo, bookingID: '1',startTime: this.startTime,endTime: this.endTime,date: this.date})
        firebase.database().ref('allBookings/' + uniqueKeyIDBooking.key).update({room: room, user: userInfo, bookingID: uniqueKeyIDBooking.key,startTime: this.startTime,endTime: this.endTime,date: this.date})

        alert('Congrats you have booked the room!');
        this.$router.go();
     }
  }
}
</script>
