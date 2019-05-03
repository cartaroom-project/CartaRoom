<template>
    <div class="allBookings">
        <h1>You are a Patron</h1>
        <h2>List of All Bookings</h2>
        <ul v-for="booking of bookings" v-bind:key ="booking['.key']">
            Room Name: {{booking.room.name}} <br />
            Booker: {{booking.user}} <br />
            Date: {{booking.date}} <br />
            Start Time: {{booking.startTime}} <br />
            End Time: {{booking.endTime}} <br />
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

    var userEmail;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // console.log(user.uid); //a@a.com = gbEw7s5ic1drxG3vgFWD3DAMb972
            userEmail = user.email;
        } else {
            // console.log("No user available");
            userEmail = "null";
        }
    });

    export default {
        name: 'allBookings',
        data () {
            return {
                bookings:[]
            }
        },
        created () {
            db.ref('allBookings').orderByChild("user").equalTo(userEmail).once('value').then((snapshot) => {
                this.bookings = [];
                snapshot.forEach((doc) => {
                    this.bookings.push(doc.val());
                })
            }).catch((error) => {
                console.log(error);
            });
        }
    }
</script>
