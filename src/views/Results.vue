<template>
  <div class="results">
    <ul>
      <h2>Search Results<br /><br /> </h2>
      <ul v-for="room of rooms" v-bind:key ="room['.key']">
        Name: {{room.name}} <br />
        Capacity: {{room.capacity}} <br />
        Address: {{room.address}} <br /> 
      <button @click="bookRoom">Book Room</button> <br />
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
     bookRoom: function() {
        alert('Congrats you have booked the room!');
        this.$router.replace('search')
     }
  }
}
</script>
