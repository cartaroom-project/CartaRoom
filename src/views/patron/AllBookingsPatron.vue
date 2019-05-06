<template>
    <div class="currentBookings">
        <h1>You are a Patron</h1>
        <h2>List of All Bookings</h2>
        <ul v-for="booking of bookings" v-bind:key ="booking['.key']">
            Room Name: {{booking.room.name}} <br />
            Host: {{booking.host}} <br />
            Date: {{booking.date}} <br />
            Time: {{booking.startTime}}:00 - {{booking.endTime}}:00<br />
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
            db.ref('allBookings').orderByChild("user").equalTo(userID).once('value').then((snapshot) => {
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
        }
    }
</script>
