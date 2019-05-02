<template>
  <div class="results">
    <ul>
      <h2>Search Results<br /><br /> </h2>
      <ul v-for="room of rooms" v-bind:key ="room['.key']">
        Name: {{room.name}} <br />
        Capacity: {{room.capacity}} <br />
        Address: {{room.address}} <br /> 
        Reserved: {{room.reserved}} <br /> 
        <button v-on:click="bookRoom(room)">Book Room</button> <br />
      </ul>
      <router-link to="/search">Back to Search</router-link>
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
export default {
  name: 'results',
   data () {
    return {
      rooms: []
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
         console.log(room)
        firebase.database().ref('rooms/' + room.uniqueKey).update({userID: room.userID, name: room.name, capacity: room.capacity, description: room.description, address: room.address, uniqueKey: room.uniqueKey, reserved: 'true'})
        alert('Congrats you have booked the room!');
        this.$router.go();
     }
  }
}
</script>
