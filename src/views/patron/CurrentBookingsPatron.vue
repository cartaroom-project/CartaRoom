<template>
    <div class="currentBookings">
        <h1>You are a Patron</h1>
        <h2>List of Current Bookings</h2>
        <ul v-for="booking of bookings" v-bind:key ="booking['.key']">
            Room Name: {{booking.room.name}} <br />
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
    var booking = firebase.functions().httpsCallable('patronBooking');
    var unbook = firebase.functions().httpsCallable('patronUnbook');

    var userID;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            userID = user.uid;
        } else {
            userID = "null";
        }
    });

    export default {
        name: 'currentBookings',
        data () {
            return {
                bookings:[],
            }
        },
        created () {
            booking({bookings:this.bookings}).then((result) => {
            this.bookings = result.data.bookings
            }).catch(function(error) {
                console.log(error);
            });

            // db.ref('currentBookings').orderByChild("user").equalTo(userID).once('value').then((snapshot) => {
            //     this.bookings = [];
            //     snapshot.forEach((doc) => {
            //         this.bookings.push(doc.val());
            //     })
            // }).catch((error) => {
            //     console.log(error);
            // });

        },
        methods: {
            unbookRoom: function(booking) {
                // firebase.database().ref('rooms/' + booking.room.uniqueKey).update({userID: booking.room.userID, name: booking.room.name, capacity: booking.room.capacity, description: booking.room.description, address: booking.room.address, uniqueKey: booking.room.uniqueKey, reserved: 'false'})
                unbook({bk: booking}).then(() => {
                    alert('Room Status has been reset');
                    this.$router.go();
                })
            }
        }
    }
</script>
