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
<<<<<<< HEAD
     <h3>Amenities:</h3>
            <ul v-for="amenity in roomInfo.amenities"  v-bind:key ="amenity['.key']">
                {{amenity}} 
            </ul>
=======
    <h3>Ammenaties:</h3>
    <ul v-for="amenity in roomInfo.selectedAmenities" v-bind:key="amenity['.key']">
        {{amenity}}
    </ul>
>>>>>>> 0960d87a91a89e500760fcb20a28b22e8b365171
    <h3>{{msg}}</h3>
    Date: <input type="date" v-model="date"><br />
    <!-- <li v-for="(value, name, index) in roomInfo.bookingSlots"> -->
    <ul v-for="index in timeSlotsAvailable" :key="index">
        <p>{{roomInfo.bookingSlots[index].startingTime}}:00 to {{roomInfo.bookingSlots[index].endingTime}}:00
            <button v-on:click="bookRoom(roomInfo.bookingSlots[index].startingTime, roomInfo.bookingSlots[index].endingTime)">Book Room</button>
        </p>
    </ul>
    <!-- <p>{{roomInfo.bookingSlots[1].startingTime}}:00 to {{roomInfo.bookingSlots[1].endingTime}}:00</p> <br /> -->
    <!-- </li> -->
    <br>
    <v-btn id="timeButton" @click="doMath"><b><u>{{msg1}}</u></b></v-btn><br />
    <router-link to="/search">Cancel</router-link>
</div>
</template>

<script>
//   console.log(this.$router);
// bookingSlots[1].startingTime
<<<<<<< HEAD
  import firebase from 'firebase';
  import db from '@/firebase.js';
=======
import firebase from 'firebase';
import db from '@/firebase.js';
import axios from 'axios';
>>>>>>> 0960d87a91a89e500760fcb20a28b22e8b365171

var userID;
var roomID = '1';
//   var timeSlotsAVailable = 2;
var storageRef = firebase.storage().ref();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // console.log(user.uid); //a@a.com = gbEw7s5ic1drxG3vgFWD3DAMb972
        userID = user.uid;
    } else {
        // console.log("No user available"); 
        userID = 'null';
    }
});

<<<<<<< HEAD
  export default {
      name: 'addRoom',
      
      data() {
      return {
          id: 0,
          room: {},
          timeSlotsAvailable : 0,
          msg: '',
          msg1: 'View time slots',
          date: '',
          hostName: '',
          userEmail: '',
        amenities:[
          {offering: 'Wifi'},
          {offering: 'Projector'},
          {offering: 'Whiteboard'},
          {offering: 'Ethernet'},
        ],
          roomInfo:
              {
                  hostID: '',
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
=======
export default {
    name: 'addRoom',

    data() {
        return {
            id: 0,
            room: {},
            timeSlotsAvailable: 0,
            msg: '',
            msg1: 'View time slots',
            date: '',
            hostName: '',
            userEmail: '',
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
                hostID: '',
                name: '',
                capacity: '',
                description: '',
                address: '',
                roomID: roomID,
                reserved: 'false',
                bookingCounter: 0,
                openTime: 0,
                closeTime: 0,
                amenities: [],
                bookingSlots: [{
                    startingTime: '9:00',
                    endingTime: '10:00'
                }]
            }
        }
>>>>>>> 0960d87a91a89e500760fcb20a28b22e8b365171
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
                this.roomInfo.bookingCounter = snapshot.val().bookingCounter,
                this.roomInfo.openTime = snapshot.val().openTime,
                this.roomInfo.closeTime = snapshot.val().closeTime,
                this.roomInfo.amenities = snapshot.val().amenities,
                this.roomInfo.bookingSlots = snapshot.val().bookingSlots
            console.log(this.roomInfo)
        });
        console.log('current user ID: ' + userID)
        firebase.database().ref('users/patron/' + userID).once('value').then((snapshot) => {
            this.room = snapshot.val();
            this.userEmail = snapshot.val().email
            console.log('userEmail: ' + this.userEmail)
        })
    },
    methods: {
        doMath: function () {
            var startHoursMinutes = this.roomInfo.openTime.split(/[.:]/);
            var startHours = parseInt(startHoursMinutes[0], 10);
            console.log('startHours' + startHours);
            var closeHoursMinutes = this.roomInfo.closeTime.split(/[.:]/);
            var closeHours = parseInt(closeHoursMinutes[0], 10);
            console.log('closeHours' + closeHours);
            this.timeSlotsAvailable = closeHours - startHours;
            console.log(this.timeSlotsAvailable)
            this.msg = 'Time Slots';
            this.msg1 = '';
        },

        bookRoom: function (startTime, endTime) {
            var userInfo = firebase.auth().currentUser.uid;
            var uniqueKeyIDBooking = '1';

            //This creates a string with all the neccessary info needed to see if a time slot is already taken or not
            var bookingInfo = startTime.toString() + '->' + endTime.toString() + '->' + this.date + '->' + this.roomInfo.roomID;
            console.log('bookingInfo:' + bookingInfo);

            if (this.date === '') {
                alert('Please select a date before moving on');
            } else {
                db.ref('currentBookings').orderByChild("bookingInfo").equalTo(bookingInfo).once('value').then((snapshot) => {
                    if (snapshot.exists()) {
                        alert('TIME SLOT NOT AVAILABLE FOR:\n' + 'date: ' + this.date + '\n' + "time: " + startTime + ':00' + " - " + endTime + ':00\n' + 'PLEASE SELECT ANOTHER DATE/TIME');
                    } else {
                        db.ref('users/host/' + this.roomInfo.hostID).once('value').then((snapshot) => {
                            this.hostName = snapshot.val().businessName;
                            console.log('host: ' + this.hostName);

                            uniqueKeyIDBooking = firebase.database().ref('currentBookings').push({
                                room: this.roomInfo,
                                user: userInfo,
                                userEmail: this.userEmail,
                                bookingID: '1',
                                startTime: startTime,
                                endTime: endTime,
                                date: this.date,
                                host: this.hostName,
                                bookingInfo: bookingInfo,
                                status: 'not completed'
                            })
                            firebase.database().ref('currentBookings/' + uniqueKeyIDBooking.key).update({
                                bookingID: uniqueKeyIDBooking.key
                            })

                            //updates room booking counter
                            db.ref('rooms/' + this.roomInfo.roomID).once('value').then((snapshot) => {
                                firebase.database().ref('rooms/' + this.roomInfo.roomID).update({
                                    bookingCounter: ++snapshot.val().bookingCounter
                                })
                            });

                            uniqueKeyIDBooking = firebase.database().ref('allBookings').push({
                                room: this.roomInfo,
                                user: userInfo,
                                userEmail: this.userEmail,
                                allbookingID: '1',
                                initialBookingID: uniqueKeyIDBooking.key,
                                startTime: startTime,
                                endTime: endTime,
                                date: this.date,
                                host: this.hostName,
                                bookingInfo: bookingInfo,
                                status: 'not completed'
                            })
                            firebase.database().ref('allBookings/' + uniqueKeyIDBooking.key).update({
                                allbookingID: uniqueKeyIDBooking.key
                            })

                            alert('BOOKING CONFIRMED\n' + 'Booking Details:\n' + 'date: ' + this.date + '\n' + "time: " + startTime + ':00' + " - " + endTime + ':00');
                            this.$router.push('CurrentBookingsPatron');
                        });
                    }
                });
            }
            // console.log(userInfo)
            // console.log(this.roomInfo)
            // console.log('hostAfter: ' + this.hostName);
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
