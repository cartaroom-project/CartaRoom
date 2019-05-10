<template>
<div class="editRoom">
    <p>Room View</p>
    <h1>Room: {{ roomInfo.name }}</h1>
    <p>Name: {{ roomInfo.name }}</p>
    <p>Capacity: {{ roomInfo.capacity }}</p>
    <p>Description: {{ roomInfo.description }}</p>
    <p>Address: {{ roomInfo.address }}</p>
    <p>Open Time: {{ roomInfo.openTime }}</p>
    <p>Close Time: {{ roomInfo.closeTime }}</p>
    <p>Total Bookings: {{ roomInfo.bookingCounter }}</p>
    <h3>Ammenaties:</h3>
        <ul v-for="amenity in roomInfo.amenities"  v-bind:key ="amenity['.key']">
        {{amenity}}
        </ul>
    <br />
    <button v-on:click="editRoom(roomInfo.roomID)">Edit Room</button>
    <button v-on:click="deleteRoom(roomInfo.roomID)">Delete Room</button><br />
    <router-link to="/home">Cancel</router-link>
</div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase.js';

    var createRoom = firebase.functions().httpsCallable('createRoom');
    var hostDeleteRoom = firebase.functions().httpsCallable('hostDeleteRoom');

    var hostID;
    var roomID = '1';
    var storageRef = firebase.storage().ref();

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            hostID = user.uid;
        } else {
            hostID = 'null';
        }
    });

    export default {
      name: 'addRoom',
      
      data() {
      return {
          id: 0,
          room: {},
        amenities:[
            {offering: 'Wifi'},
            {offering: 'Projector'},
            {offering: 'Whiteboard'},
            {offering: 'Ethernet'},
        ],
          roomInfo:
              {
                  hostID: hostID,
                  name: '',
                  capacity: '',
                  description: '',
                  address: '',
                  roomID: roomID,
                  reserved: 'false',
                  bookingCounter: 0,
                  openTime:0,
                  closeTime:0,
                  amenities: [],
                  bookingSlots: [{startingTime: '9:00',endingTime: '10:00'}]
              }
      }
    },
    async created() {
            this.id = this.$route.params.id;
            await createRoom({id: this.id, roomInfo: this.roomInfo}).then((result) => {
                this.roomInfo = result.data.roomInfo
            }).catch(function(error) {
                console.log(error);
            });
    },

    methods: {
      deleteRoom: function(id) {
       if(window.confirm("Are you sure you want to delete this room?")){
          hostDeleteRoom({id:id}).then(() => {
          alert('Room Deleted!');
          this.$router.go(-1);
        })
        }
    },  

    editRoom: function(id){
      this.$router.push({
        name: 'EditRoom',
        params: { id: id }
      })
    }
    },

}
</script>

 
<style scoped>
.sign-up {
    margin-top: 40px;
}

input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
}

button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
}

span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
}
</style>
