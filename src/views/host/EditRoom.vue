<template>
<div class="editRoom">
    <p>Let's Edit a room</p>
    <h1>{{roomInfo.name}}</h1>
    <input type="text" v-model="roomInfo.name"><br>
    <input type="number" v-model="roomInfo.capacity"><br>
    <input type="text" v-model="roomInfo.description"><br>
    <input type="text" v-model="roomInfo.address"><br>
    Open Time:<br /> <input type="time" v-model="roomInfo.openTime"><br />
    Close Time:<br /> <input type="time" v-model="roomInfo.closeTime"><br />
    <h3>Ammenaties:</h3>
    <li v-for="amenity in amenities" v-bind:key="amenity['.key']">
        <input type="checkbox" :id="amenity.offering" :value="amenity.offering" v-model="roomInfo.selectedAmenities">
        <label :for="amenity.offering">{{amenity.offering}}</label>
    </li>
    <!-- <input type = "file" @click="uploadImage"> -->
    <br>
    <button @click="updateRoom">Confirm Edit</button><br />
    <router-link to="/home">Cancel</router-link>
</div>
</template>

 
<script>
//   console.log(this.$router);
import firebase from 'firebase';
import axios from 'axios';

var hostID;
var roomID = '1';
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
                bookingSlots: [
                    []
                ]
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
                //   this.roomInfo.selectedAmenities = snapshot.val().amenities,
                // this.roomInfo.bookingSlots = snapshot.val().bookingSlots
                console.log(this.roomInfo)
        })
        console.log(this.roomInfo)
    },
    methods: {
        updateRoom: function () {
            var i = 0;
            var startHoursMinutes = this.roomInfo.openTime.split(/[.:]/);
            var startHours = parseInt(startHoursMinutes[0], 10);
            var closeHoursMinutes = this.roomInfo.closeTime.split(/[.:]/);
            var closeHours = parseInt(closeHoursMinutes[0], 10);
            var timeSlotsAVailable = closeHours - startHours;
            var firstTimeSlot = startHours;

            while (i < timeSlotsAVailable) {
                this.roomInfo.bookingSlots.push({
                    startingTime: firstTimeSlot,
                    endingTime: ++firstTimeSlot
                });
                i++;
            }

            firebase.database().ref('rooms/' + this.id).update({
                hostID: this.roomInfo.hostID,
                name: this.roomInfo.name,
                capacity: this.roomInfo.capacity,
                description: this.roomInfo.description,
                address: this.roomInfo.address,
                roomID: this.id,
                reserved: this.roomInfo.reserved,
                bookingCounter: this.roomInfo.bookingCounter,
                openTime: this.roomInfo.openTime,
                closeTime: this.roomInfo.closeTime,
                amenities: this.roomInfo.selectedAmenities,
                bookingSlots: this.roomInfo.bookingSlots
            })

            this.$router.go(-1)
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
