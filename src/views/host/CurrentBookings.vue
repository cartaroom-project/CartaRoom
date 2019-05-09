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
    var booking = firebase.functions().httpsCallable('hostBooking');
    var unbook = firebase.functions().httpsCallable('hostUnbook');

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
        },
        methods: {
            unbookRoom: function(booking) {
                unbook({bk: booking}).then(() => {
                    alert('Room Status has been reset');
                    this.$router.go();
                })
            }
        }
    }
</script>
