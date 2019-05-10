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
            Status: {{booking.status}} <br />
            <button v-on:click="simulateFinish(booking)">Simulate Finish</button> 
            <button v-on:click="cancelBooking(booking)">Cancel Booking</button><br />
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
            simulateFinish: function(booking) {
                // console.log('bookingID: ' + booking.bookingInfo)
                db.ref('allBookings').orderByChild("initialBookingID").equalTo(booking.bookingID).once('value').then((snapshot) => {
                   snapshot.forEach((doc) => {
                     db.ref('allBookings').child(doc.key).update({status: 'Completed'});
                     })
                });
                db.ref('currentBookings').child(booking.bookingID).remove();
                 alert('Room has been used(simulated)');
                 this.$router.go();
            },
                cancelBooking: function(booking) {
                // console.log('bookingID: ' + booking.bookingInfo)
                        if(window.confirm("Are you sure you want to cancel this reservation?")){
                db.ref('allBookings').orderByChild("initialBookingID").equalTo(booking.bookingID).once('value').then((snapshot) => {
                   snapshot.forEach((doc) => {
                     db.ref('allBookings').child(doc.key).update({status: 'Cancelled'});
                     })
                });
                db.ref('currentBookings').child(booking.bookingID).remove();
                 alert('Reservation has been cancelled');
                 this.$router.go();
                        }
            }
        }
    }
</script>
