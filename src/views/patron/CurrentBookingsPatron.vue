<template>
    <div class="currentBookings">
        <h1>You are a Patron</h1>
        <h2>List of Current Bookings</h2>
        <ul v-for="booking of bookings" v-bind:key ="booking['.key']">
            Room Name: {{booking.room.name}} <br />
            Booker: {{user.firstName}}  {{user.lastName}}<br />
            Host: {{booking.host}} <br />
            Date: {{booking.date}} <br />
            Start Time: {{booking.startTime}}:00 <br />
            End Time: {{booking.endTime}}:00 <br />
            <button v-on:click="unbookRoom(booking)">Remove Booking</button> <br />
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
        name: 'currentBookings',
        data () {
            return {
                bookings:[],
                user: '',
            }
        },
        created () {
            db.ref('currentBookings').orderByChild("user").equalTo(userID).once('value').then((snapshot) => {
                this.bookings = [];
                snapshot.forEach((doc) => {
                    this.bookings.push(doc.val());
                })
            }).catch((error) => {
                console.log(error);
            });

            db.ref('users/patron/' + userID).once('value').then((snapshot) => {
            this.user = snapshot.val();
            });
        },
        methods: {
            unbookRoom: function(booking) {
                // firebase.database().ref('rooms/' + booking.room.uniqueKey).update({userID: booking.room.userID, name: booking.room.name, capacity: booking.room.capacity, description: booking.room.description, address: booking.room.address, uniqueKey: booking.room.uniqueKey, reserved: 'false'})
                 db.ref('currentBookings').child(booking.bookingID).remove();
                 alert('Room Status has been reset');
                 this.$router.go();
                console.log('userInfo: ' + this.user);
            }
        }
    }
</script>
