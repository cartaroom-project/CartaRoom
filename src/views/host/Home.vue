<template>
    <div class="home">
        <div class="banner">
            <h1>You are a Host</h1>
            <h2>List of All rooms</h2>
        </div>
        <ul v-for="room of rooms" v-bind:key ="room['.key']">
            Name: {{room.name}} <br />
            Capacity: {{room.capacity}} <br /> 
            Address: {{room.address}} <br />  
            <button v-on:click="viewRoom(room.roomID)">View Room</button>
            <br />
            
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
          viewRoom: function(id){
          this.$router.push({
            name: 'RoomViewHost',
            params: { id: id }
          })
        }
      }
    }
</script>

<style>
    .banner{
        height: 450px;
        width: 100%;
        background-image: url(../../assets/banner/Host.jpg);
        background-repeat: no-repeat;
        background-size:cover;
        background-position:25%;
        
    }
</style>