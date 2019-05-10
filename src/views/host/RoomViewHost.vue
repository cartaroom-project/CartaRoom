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
    <ul v-for="amenity in roomInfo.selectedAmenities" v-bind:key="amenity['.key']">
        {{amenity}}
    </ul>
    <br />
    <button v-on:click="editRoom(roomInfo.roomID)">Edit Room</button>
    <button v-on:click="deleteRoom(roomInfo.roomID)">Delete Room</button><br />
    <router-link to="/home">Cancel</router-link>
</div>
</template>

 
<script>
//   console.log(this.$router);
// bookingSlots[1].startingTime
import firebase from 'firebase';
import db from '@/firebase.js';
import axios from 'axios';

var hostID;
var roomID = '1';
//   var timeSlotsAVailable = 2;
var storageRef = firebase.storage().ref();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // console.log(user.uid); //a@a.com = gbEw7s5ic1drxG3vgFWD3DAMb972
        hostID = user.uid;
    } else {
        // console.log("No user available"); 
        hostID = 'null';
    }
});

export default {
    name: 'addRoom',

    data() {
        return {
            id: 0,
            room: {},
            amenities: [{
                    offering: 'wifi'
                },
                {
                    offering: 'projector'
                },
                {
                    offering: 'whiteboard'
                },
                {
                    offering: 'Ethernet'
                },
            ],
            roomInfo: {
                hostID: hostID,
                name: '',
                capacity: '',
                description: '',
                address: '',
                roomID: roomID,
                reserved: 'false',
                bookingCounter: 0,
                openTime: 0,
                closeTime: 0,
                selectedAmenities: [],
                bookingSlots: [{
                    startingTime: '9:00',
                    endingTime: '10:00'
                }]
            }
        }
    },
    created() {
        this.id = this.$route.params.id;
        // this.roomInfo.name =  firebase.database().ref('rooms/' + this.id +'/name' )
        firebase.database().ref('rooms/' + this.id).once('value').then((snapshot) => {
            this.room = snapshot.val();
            this.roomInfo.hostID = snapshot.val().hostID,
                this.roomInfo.name = snapshot.val().name,
                this.roomInfo.capacity = snapshot.val().capacity,
                this.roomInfo.description = snapshot.val().description,
                this.roomInfo.address = snapshot.val().address,
                this.roomInfo.roomID = snapshot.val().roomID,
                this.roomInfo.reserved = snapshot.val().reserved,
                this.roomInfo.bookingCounter = snapshot.val().bookingCounter,
                this.roomInfo.openTime = snapshot.val().openTime,
                this.roomInfo.closeTime = snapshot.val().closeTime,
                this.roomInfo.selectedAmenities = snapshot.val().amenities,
                this.roomInfo.bookingSlots = snapshot.val().bookingSlots
            console.log(this.roomInfo)
        })
        console.log(this.roomInfo)
        // this.doMath();
    },
    methods: {
        deleteRoom: function (id) {
            console.log('room ID ' + id);
            if (window.confirm("Are you sure you want to delete this room?")) {
                db.ref('rooms').child(id).remove();
                alert('Room Deleted!');
                this.$router.go(-1);
            }
        },
        editRoom: function (id) {
            this.$router.push({
                name: 'EditRoom',
                params: {
                    id: id
                }
            })
        }
    },

    // post: function()
    // {
    //    this.$http.post(firebase.database().ref('users'), this.credentials).then(function (data) {
    //
    //        this.submitted=true;
    //        this.$router.replace('home')
    //        }
    //    )
    // }
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
