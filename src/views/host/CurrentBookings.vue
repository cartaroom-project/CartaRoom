<template>
    <div class="currentBookings">
        <h1>You are a Host</h1>
        <h2>List of Current Bookings</h2>
        <ul>
        <li v-for="booking of bookings" v-bind:key ="bookings['.key']">
            Room Name: {{booking.room.name}} <br />
            Booker: {{booking.userEmail}}<br />
            Host: {{booking.host}} <br />
            Date: {{booking.date}} <br />
            Start Time: {{booking.startTime}}:00 <br />
            End Time: {{booking.endTime}}:00 <br />
            <button v-on:click="unbookRoom(booking)">Remove Booking</button> <br />
        </li>
        </ul>
        
    </div>
</template>

<script>
    import firebase from 'firebase';
    import db from '@/firebase.js';
    var booking = firebase.functions().httpsCallable('booking');
    var unbook = firebase.functions().httpsCallable('unbook');

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
            }
        },
        created () {
            booking({bookings:this.bookings}).then((result) => {
            this.bookings = result.data.bookings
            }).catch(function(error) {
                console.log(error);
            });
        },
        methods: {
            unbookRoom: function(booking) {
                // firebase.database().ref('rooms/' + booking.room.uniqueKey).update({userID: booking.room.userID, name: booking.room.name, capacity: booking.room.capacity, description: booking.room.description, address: booking.room.address, uniqueKey: booking.room.uniqueKey, reserved: 'false'})
                console.log({bk:booking})
                unbook({bk: booking})
                alert('Room Status has been reset');
                this.$router.go();
            }
        }
    }
</script>
