<template>
  <div class="home">
      <h1>You are a Host</h1>
      <h2>List of All rooms</h2>
      <ul v-for="room of rooms" v-bind:key ="room['.key']">
      Name: {{room.name}} <br />
      Capacity: {{room.capacity}} <br /> 
      Address: {{room.address}} <br />  
      <button v-on:click="editRoom(room.roomID)">Edit Room</button>
      <button v-on:click="deleteRoom(room.roomID)">Delete Room</button>
      <br /></ul>
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
      rooms: []
    }
   },
    created () {
        db.ref('rooms').orderByChild("hostID").equalTo(userID).once('value').then((snapshot) => {
        this.rooms = [];
        snapshot.forEach((doc) => {
          this.rooms.push(doc.val());
        }) 
      }).catch((error) => {
        console.log(error);
      });
    },
  methods: {
      deleteRoom: function(id) {
        console.log('room ID ' + id);
        db.ref('rooms').child(id).remove();
        alert('Room Deleted!');
        this.$router.go();
    },  
    editRoom: function(id){
      this.$router.push({
        name: 'EditRoom',
        params: { id: id }
      })
    }
  }
}
</script>
